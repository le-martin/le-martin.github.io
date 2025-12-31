"""
Interactive Technical Analysis Plot using Plotly.

This module provides an interactive visualization tool for technical analysis
of financial assets (stocks, cryptocurrencies, etc.) using Plotly. It includes
various indicators such as:
- Moving Averages (SMA, EMA)
- Pi Cycle Indicators
- Fear and Greed Index
- Golden Ratio Multipliers
- MACD (Moving Average Convergence Divergence)
- RSI (Relative Strength Index)
- Bollinger Bands

Usage:
    from interactive_plot_plotly import InteractiveTechnicalAnalysis
    
    # Basic usage with defaults
    chart = InteractiveTechnicalAnalysis("BTC-USD")
    chart.show()
    
    # Customized usage
    chart = InteractiveTechnicalAnalysis(
        ticker="AAPL",
        start_date="2020-01-01",
        end_date="2024-12-31",
        use_cache=True
    )
    chart.save_html("apple_analysis.html")
"""

from __future__ import annotations

import datetime as dt
import hashlib
import json
import logging
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd
import plotly.graph_objects as go
import yfinance as yf
from plotly.subplots import make_subplots

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# =============================================================================
# Constants
# =============================================================================

# Default ticker symbol
DEFAULT_TICKER = "BTC-USD"

# Default date range
DEFAULT_START_DATE = dt.datetime(2011, 10, 28)

# Moving Average periods
DEFAULT_MA_PERIODS = {
    "SMA_30": 30,
    "SMA_100": 100,
    "SMA_111": 111,
    "SMA_350": 350,
}

# Pi Cycle indicator constants
PI_CYCLE_LOW_MA_MULTIPLIER = 0.745
PI_CYCLE_HIGH_MA_MULTIPLIER = 2.0
PI_CYCLE_LOW_MA_PERIOD = 471
PI_CYCLE_LOW_EMA_PERIOD = 150
PI_CYCLE_HIGH_MA_LONG_PERIOD = 350
PI_CYCLE_HIGH_MA_SHORT_PERIOD = 111

# Fear and Greed indicator defaults
DEFAULT_FEAR_GREED_FAST = 10
DEFAULT_FEAR_GREED_SLOW = 30
DEFAULT_FEAR_GREED_SMOOTH = 2

# Golden Ratio multipliers (Fibonacci-based)
DEFAULT_GOLDEN_MULTIPLIERS = [1.618, 2, 3, 5, 8, 13, 21]

# RSI thresholds
RSI_OVERBOUGHT = 70
RSI_OVERSOLD = 30
RSI_DEFAULT_PERIOD = 14

# MACD defaults
MACD_FAST_PERIOD = 12
MACD_SLOW_PERIOD = 26
MACD_SIGNAL_PERIOD = 9

# Bollinger Bands defaults
BOLLINGER_PERIOD = 20
BOLLINGER_STD_DEV = 2

# Cache settings
CACHE_DIR = Path(".cache")
CACHE_EXPIRY_HOURS = 24

# Bitcoin halving events
BITCOIN_HALVING_EVENTS = [
    (dt.datetime(2012, 11, 28, tzinfo=dt.timezone.utc), "1st Bitcoin Halving"),
    (dt.datetime(2016, 7, 9, tzinfo=dt.timezone.utc), "2nd Bitcoin Halving"),
    (dt.datetime(2020, 5, 11, tzinfo=dt.timezone.utc), "3rd Bitcoin Halving"),
    (dt.datetime(2024, 4, 20, tzinfo=dt.timezone.utc), "4th Bitcoin Halving"),
]

# Modern Professional Color Palette
COLORS = {
    # Price & Candles
    "price": "#E8E8E8",
    "candle_up": "#00D4AA",  # Teal green
    "candle_down": "#FF6B6B",  # Coral red
    "candle_up_fill": "rgba(0, 212, 170, 0.8)",
    "candle_down_fill": "rgba(255, 107, 107, 0.8)",
    
    # Volume
    "volume_up": "rgba(0, 212, 170, 0.4)",
    "volume_down": "rgba(255, 107, 107, 0.4)",
    "volume": "rgba(100, 100, 150, 0.4)",
    
    # Bullish/Bearish
    "bullish": "#00D4AA",
    "bearish": "#FF6B6B",
    "bullish_fill": "rgba(0, 212, 170, 0.6)",
    "bearish_fill": "rgba(255, 107, 107, 0.6)",
    
    # MACD
    "macd_line": "#5C9DFF",  # Sky blue
    "macd_signal": "#FFB347",  # Soft orange
    "macd_hist_up": "rgba(0, 212, 170, 0.7)",
    "macd_hist_down": "rgba(255, 107, 107, 0.7)",
    
    # RSI
    "rsi": "#B19CD9",  # Light purple
    "rsi_overbought": "rgba(255, 107, 107, 0.5)",
    "rsi_oversold": "rgba(0, 212, 170, 0.5)",
    "rsi_middle": "rgba(255, 255, 255, 0.2)",
    
    # Bollinger Bands
    "bollinger_upper": "rgba(147, 112, 219, 0.6)",
    "bollinger_lower": "rgba(147, 112, 219, 0.6)",
    "bollinger_middle": "rgba(147, 112, 219, 0.9)",
    "bollinger_fill": "rgba(147, 112, 219, 0.15)",
    
    # Halving events
    "halving": "#FFD700",  # Gold
    
    # Fear & Greed gradient
    "fear": "#FF6B6B",
    "greed": "#00D4AA",
    
    # SMA colors (rainbow gradient)
    "sma_colors": ["#FF6B6B", "#FFB347", "#FFD93D", "#6BCB77", "#4D96FF", "#9B59B6"],
    
    # Golden ratio colors (warm gradient)
    "golden_colors": ["#FFD700", "#FFA500", "#FF8C00", "#FF7F50", "#FF6347", "#FF4500", "#DC143C"],
    
    # Grid and background
    "grid": "rgba(255, 255, 255, 0.05)",
    "panel_bg": "rgba(20, 20, 35, 0.95)",
}

# Chart styling
CHART_STYLE = {
    "font_family": "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    "title_font_size": 24,
    "subtitle_font_size": 14,
    "axis_font_size": 11,
    "legend_font_size": 11,
    "line_width": 1.5,
    "candle_width": 0.8,
}


# =============================================================================
# Configuration Dataclasses
# =============================================================================


@dataclass
class MAConfig:
    """Configuration for Moving Averages."""

    periods: dict[str, int] = field(default_factory=lambda: DEFAULT_MA_PERIODS.copy())


@dataclass
class PiCycleConfig:
    """Configuration for Pi Cycle indicators."""

    low_ma_period: int = PI_CYCLE_LOW_MA_PERIOD
    low_ema_period: int = PI_CYCLE_LOW_EMA_PERIOD
    high_ma_long_period: int = PI_CYCLE_HIGH_MA_LONG_PERIOD
    high_ma_short_period: int = PI_CYCLE_HIGH_MA_SHORT_PERIOD
    low_ma_multiplier: float = PI_CYCLE_LOW_MA_MULTIPLIER
    high_ma_multiplier: float = PI_CYCLE_HIGH_MA_MULTIPLIER


@dataclass
class FearGreedConfig:
    """Configuration for Fear and Greed indicator."""

    fast_length: int = DEFAULT_FEAR_GREED_FAST
    slow_length: int = DEFAULT_FEAR_GREED_SLOW
    smooth_length: int = DEFAULT_FEAR_GREED_SMOOTH


@dataclass
class MACDConfig:
    """Configuration for MACD indicator."""

    fast_period: int = MACD_FAST_PERIOD
    slow_period: int = MACD_SLOW_PERIOD
    signal_period: int = MACD_SIGNAL_PERIOD


@dataclass
class RSIConfig:
    """Configuration for RSI indicator."""

    period: int = RSI_DEFAULT_PERIOD
    overbought: int = RSI_OVERBOUGHT
    oversold: int = RSI_OVERSOLD


@dataclass
class BollingerConfig:
    """Configuration for Bollinger Bands."""

    period: int = BOLLINGER_PERIOD
    std_dev: float = BOLLINGER_STD_DEV


@dataclass
class IndicatorConfig:
    """Master configuration for all indicators."""

    ma: MAConfig = field(default_factory=MAConfig)
    pi_cycle: PiCycleConfig = field(default_factory=PiCycleConfig)
    fear_greed: FearGreedConfig = field(default_factory=FearGreedConfig)
    macd: MACDConfig = field(default_factory=MACDConfig)
    rsi: RSIConfig = field(default_factory=RSIConfig)
    bollinger: BollingerConfig = field(default_factory=BollingerConfig)
    golden_multipliers: list[float] = field(
        default_factory=lambda: DEFAULT_GOLDEN_MULTIPLIERS.copy()
    )


# =============================================================================
# Data Fetching and Caching
# =============================================================================


class DataFetcher:
    """Handles fetching and caching of financial data."""

    def __init__(self, use_cache: bool = True, cache_dir: Path = CACHE_DIR):
        """
        Initialize the data fetcher.

        Args:
            use_cache: Whether to use cached data if available.
            cache_dir: Directory for storing cached data.
        """
        self.use_cache = use_cache
        self.cache_dir = cache_dir
        if use_cache:
            self.cache_dir.mkdir(exist_ok=True)

    def _get_cache_key(
        self, ticker: str, start: dt.datetime, end: dt.datetime
    ) -> str:
        """Generate a unique cache key for the request."""
        key_string = f"{ticker}_{start.date()}_{end.date()}"
        return hashlib.md5(key_string.encode()).hexdigest()

    def _get_cache_path(self, cache_key: str) -> Path:
        """Get the path to the cache file."""
        return self.cache_dir / f"{cache_key}.pkl"

    def _is_cache_valid(self, cache_path: Path) -> bool:
        """Check if cached data exists and is not expired."""
        if not cache_path.exists():
            return False

        # Check cache age
        cache_time = dt.datetime.fromtimestamp(cache_path.stat().st_mtime)
        age = dt.datetime.now() - cache_time
        return age.total_seconds() < CACHE_EXPIRY_HOURS * 3600

    def fetch(
        self,
        ticker: str,
        start: dt.datetime,
        end: dt.datetime,
    ) -> pd.DataFrame:
        """
        Fetch historical data for the given ticker.

        Args:
            ticker: The ticker symbol (e.g., 'BTC-USD', 'AAPL').
            start: Start date for the data.
            end: End date for the data.

        Returns:
            DataFrame with OHLCV data.

        Raises:
            ValueError: If no data could be fetched.
        """
        cache_key = self._get_cache_key(ticker, start, end)
        cache_path = self._get_cache_path(cache_key)

        # Try to load from cache
        if self.use_cache and self._is_cache_valid(cache_path):
            logger.info(f"Loading cached data for {ticker}")
            try:
                data = pd.read_pickle(cache_path)
                return data
            except Exception as e:
                logger.warning(f"Failed to load cache: {e}")

        # Fetch from API
        logger.info(f"Fetching data for {ticker} from Yahoo Finance")
        try:
            data = yf.download(ticker, start, end, progress=False)

            if data.empty:
                raise ValueError(f"No data returned for ticker '{ticker}'")

            # Normalize column names (handle multi-level columns)
            if isinstance(data.columns, pd.MultiIndex):
                data.columns = data.columns.get_level_values(0)

            # Ensure timezone-aware index
            if data.index.tz is None:
                data.index = data.index.tz_localize("UTC")

            # Cache the data
            if self.use_cache:
                data.to_pickle(cache_path)
                logger.info(f"Cached data to {cache_path}")

            return data

        except Exception as e:
            logger.error(f"Failed to fetch data for {ticker}: {e}")
            raise ValueError(f"Could not fetch data for '{ticker}': {e}") from e


# =============================================================================
# Technical Indicators Calculator
# =============================================================================


class IndicatorCalculator:
    """Calculates various technical indicators."""

    def __init__(self, data: pd.DataFrame, config: IndicatorConfig):
        """
        Initialize the calculator.

        Args:
            data: DataFrame with OHLCV data.
            config: Configuration for indicators.
        """
        self.data = data.copy()
        self.config = config

    @staticmethod
    def wma(series: pd.Series, length: int) -> pd.Series:
        """
        Calculate the Weighted Moving Average (WMA).

        Args:
            series: Price series.
            length: WMA period.

        Returns:
            WMA series.
        """
        weights = np.arange(1, length + 1)
        return series.rolling(length).apply(
            lambda x: np.dot(x, weights) / weights.sum(), raw=True
        )

    def calculate_sma(self, column: str = "Close") -> None:
        """Calculate Simple Moving Averages."""
        for name, period in self.config.ma.periods.items():
            self.data[name] = self.data[column].rolling(window=period).mean()

    def calculate_pi_cycle(self, column: str = "Close") -> None:
        """Calculate Pi Cycle indicators."""
        cfg = self.config.pi_cycle

        # Low signals
        self.data["pi_ma_long_low"] = (
            self.data[column].rolling(window=cfg.low_ma_period).mean()
            * cfg.low_ma_multiplier
        )
        self.data["pi_ema_short_low"] = self.data[column].ewm(
            span=cfg.low_ema_period, adjust=False
        ).mean()

        # High signals
        self.data["pi_ma_long_hi"] = (
            self.data[column].rolling(window=cfg.high_ma_long_period).mean()
            * cfg.high_ma_multiplier
        )
        self.data["pi_ma_short_hi"] = (
            self.data[column].rolling(window=cfg.high_ma_short_period).mean()
        )

        # Cross detection
        self.data["pi_low_cross"] = (
            self.data["pi_ema_short_low"] < self.data["pi_ma_long_low"]
        ) & (
            self.data["pi_ema_short_low"].shift(1)
            >= self.data["pi_ma_long_low"].shift(1)
        )

        self.data["pi_high_cross"] = (
            self.data["pi_ma_long_hi"] < self.data["pi_ma_short_hi"]
        ) & (
            self.data["pi_ma_long_hi"].shift(1)
            >= self.data["pi_ma_short_hi"].shift(1)
        )

    def calculate_fear_greed(self, column: str = "Close") -> None:
        """Calculate Fear and Greed indicator."""
        cfg = self.config.fear_greed

        # True Range calculation
        high_low = self.data["High"] - self.data["Low"]
        high_close = abs(self.data["High"] - self.data[column].shift(1))
        low_close = abs(self.data["Low"] - self.data[column].shift(1))
        true_range = pd.concat([high_low, high_close, low_close], axis=1).max(axis=1)

        # Previous close
        prev_close = self.data[column].shift(1)

        # TR Up and TR Down
        tr_up = np.where(self.data[column] > prev_close, true_range, 0)
        tr_down = np.where(self.data[column] < prev_close, true_range, 0)

        # Fast and Slow calculations
        fast_up = self.wma(pd.Series(tr_up, index=self.data.index), cfg.fast_length)
        fast_down = self.wma(pd.Series(tr_down, index=self.data.index), cfg.fast_length)
        fast_diff = fast_up - fast_down

        slow_up = self.wma(pd.Series(tr_up, index=self.data.index), cfg.slow_length)
        slow_down = self.wma(pd.Series(tr_down, index=self.data.index), cfg.slow_length)
        slow_diff = slow_up - slow_down

        # Fear and Greed Index
        diff = fast_diff - slow_diff
        self.data["fgi"] = self.wma(diff, cfg.smooth_length)

    def calculate_golden_ratio(self, column: str = "Close") -> None:
        """Calculate Golden Ratio multiplier lines."""
        base_sma = self.data[column].rolling(window=350).mean()
        for multiplier in self.config.golden_multipliers:
            self.data[f"Golden_{multiplier}"] = base_sma * multiplier

    def calculate_macd(self, column: str = "Close") -> None:
        """Calculate MACD indicator."""
        cfg = self.config.macd
        series = self.data[column]

        exp_fast = series.ewm(span=cfg.fast_period, adjust=False).mean()
        exp_slow = series.ewm(span=cfg.slow_period, adjust=False).mean()

        self.data["macd"] = exp_fast - exp_slow
        self.data["macd_signal"] = self.data["macd"].ewm(
            span=cfg.signal_period, adjust=False
        ).mean()
        self.data["macd_hist"] = self.data["macd"] - self.data["macd_signal"]

    def calculate_rsi(self, column: str = "Close") -> None:
        """Calculate RSI indicator."""
        cfg = self.config.rsi
        delta = self.data[column].diff()

        gains = delta.clip(lower=0)
        losses = (-delta).clip(lower=0)

        avg_gains = gains.ewm(com=cfg.period - 1, min_periods=cfg.period).mean()
        avg_losses = losses.ewm(com=cfg.period - 1, min_periods=cfg.period).mean()

        rs = avg_gains / avg_losses
        self.data["rsi"] = 100 - (100 / (1 + rs))

    def calculate_bollinger_bands(self, column: str = "Close") -> None:
        """Calculate Bollinger Bands."""
        cfg = self.config.bollinger

        self.data["bb_middle"] = self.data[column].rolling(window=cfg.period).mean()
        rolling_std = self.data[column].rolling(window=cfg.period).std()

        self.data["bb_upper"] = self.data["bb_middle"] + (rolling_std * cfg.std_dev)
        self.data["bb_lower"] = self.data["bb_middle"] - (rolling_std * cfg.std_dev)

    def calculate_all(self) -> pd.DataFrame:
        """Calculate all indicators and return the enriched DataFrame."""
        self.calculate_sma()
        self.calculate_pi_cycle()
        self.calculate_fear_greed()
        self.calculate_golden_ratio()
        self.calculate_macd()
        self.calculate_rsi()
        self.calculate_bollinger_bands()
        return self.data


# =============================================================================
# Interactive Plot Builder
# =============================================================================


class PlotBuilder:
    """Builds interactive Plotly charts for technical analysis."""

    def __init__(
        self,
        data: pd.DataFrame,
        ticker: str,
        config: IndicatorConfig,
        show_halving_events: bool = True,
    ):
        """
        Initialize the plot builder.

        Args:
            data: DataFrame with OHLCV and indicator data.
            ticker: Ticker symbol for the chart title.
            config: Indicator configuration.
            show_halving_events: Whether to show Bitcoin halving events.
        """
        self.data = data
        self.ticker = ticker
        self.config = config
        self.show_halving_events = show_halving_events
        self.fig: go.Figure | None = None

    def _add_price_trace(self, fig: go.Figure) -> None:
        """Add price visualization (candlestick or line based on data size)."""
        # Use line chart for large datasets (>2000 points) for better performance
        use_candlestick = len(self.data) <= 2000
        
        if use_candlestick:
            # Candlestick chart (more informative but heavier)
            fig.add_trace(
                go.Candlestick(
                    x=self.data.index,
                    open=self.data["Open"],
                    high=self.data["High"],
                    low=self.data["Low"],
                    close=self.data["Close"],
                    name=f"{self.ticker}",
                    increasing=dict(
                        line=dict(color=COLORS["candle_up"], width=1),
                        fillcolor=COLORS["candle_up_fill"],
                    ),
                    decreasing=dict(
                        line=dict(color=COLORS["candle_down"], width=1),
                        fillcolor=COLORS["candle_down_fill"],
                    ),
                    visible=True,
                    showlegend=True,
                ),
                row=1,
                col=1,
            )
        else:
            # Line chart for better performance with large datasets
            fig.add_trace(
                go.Scattergl(  # Use WebGL for better performance
                    x=self.data.index,
                    y=self.data["Close"],
                    name=f"{self.ticker}",
                    line=dict(color=COLORS["price"], width=CHART_STYLE["line_width"]),
                    visible=True,
                    hovertemplate="%{x}<br>Price: $%{y:,.2f}<extra></extra>",
                ),
                row=1,
                col=1,
            )
        
        # Also add a simple line for when zoomed out (smoother view)
        fig.add_trace(
            go.Scattergl(  # Use WebGL
                x=self.data.index,
                y=self.data["Close"],
                name=f"{self.ticker} Line" if use_candlestick else "Price (duplicate)",
                line=dict(color=COLORS["price"], width=CHART_STYLE["line_width"]),
                visible="legendonly",
                hoverinfo="skip",
            ),
            row=1,
            col=1,
        )

    def _add_sma_traces(self, fig: go.Figure) -> None:
        """Add SMA lines to the chart."""
        sma_colors = COLORS["sma_colors"]
        for i, (name, _) in enumerate(self.config.ma.periods.items()):
            if name in self.data.columns:
                fig.add_trace(
                    go.Scatter(
                        x=self.data.index,
                        y=self.data[name],
                        name=name,
                        line=dict(
                            color=sma_colors[i % len(sma_colors)],
                            width=CHART_STYLE["line_width"],
                        ),
                        visible="legendonly",
                        hovertemplate=f"{name}: %{{y:,.2f}}<extra></extra>",
                    ),
                    row=1,
                    col=1,
                )

    def _add_bollinger_bands(self, fig: go.Figure) -> None:
        """Add Bollinger Bands to the chart."""
        # Upper band
        fig.add_trace(
            go.Scatter(
                x=self.data.index,
                y=self.data["bb_upper"],
                name="BB Upper",
                line=dict(color=COLORS["bollinger_upper"], width=1),
                visible="legendonly",
                showlegend=False,
                hoverinfo="skip",
            ),
            row=1,
            col=1,
        )

        # Lower band (with fill to upper)
        fig.add_trace(
            go.Scatter(
                x=self.data.index,
                y=self.data["bb_lower"],
                name="Bollinger Bands",
                line=dict(color=COLORS["bollinger_lower"], width=1),
                fill="tonexty",
                fillcolor=COLORS["bollinger_fill"],
                visible="legendonly",
                hoverinfo="skip",
            ),
            row=1,
            col=1,
        )

        # Middle band (SMA)
        fig.add_trace(
            go.Scatter(
                x=self.data.index,
                y=self.data["bb_middle"],
                name="BB SMA",
                line=dict(color=COLORS["bollinger_middle"], width=CHART_STYLE["line_width"], dash="dot"),
                visible="legendonly",
                hovertemplate="BB Middle: %{y:,.2f}<extra></extra>",
            ),
            row=1,
            col=1,
        )

    def _add_pi_cycle_traces(self, fig: go.Figure) -> None:
        """Add Pi Cycle indicators to the chart."""
        # Low cross markers
        low_cross_data = self.data[self.data["pi_low_cross"]]
        if not low_cross_data.empty:
            fig.add_trace(
                go.Scatter(
                    x=low_cross_data.index,
                    y=low_cross_data["Close"],
                    name="Pi Cycle Low",
                    mode="markers",
                    marker=dict(symbol="triangle-up", size=20, color="blue"),
                    visible="legendonly",
                ),
                row=1,
                col=1,
            )

        # High cross markers
        high_cross_data = self.data[self.data["pi_high_cross"]]
        if not high_cross_data.empty:
            fig.add_trace(
                go.Scatter(
                    x=high_cross_data.index,
                    y=high_cross_data["Close"],
                    name="Pi Cycle High",
                    mode="markers",
                    marker=dict(symbol="triangle-down", size=20, color="cyan"),
                    visible="legendonly",
                ),
                row=1,
                col=1,
            )

        # Pi Cycle lines
        pi_lines = [
            ("Pi Low MA", "pi_ma_long_low", "rgba(255, 0, 0, 0.3)"),
            ("Pi Low EMA", "pi_ema_short_low", "rgba(0, 255, 0, 0.3)"),
            ("Pi High Long", "pi_ma_long_hi", "rgba(0, 255, 255, 0.3)"),
            ("Pi High Short", "pi_ma_short_hi", "rgba(255, 255, 0, 0.3)"),
        ]

        for name, col, color in pi_lines:
            if col in self.data.columns:
                fig.add_trace(
                    go.Scatter(
                        x=self.data.index,
                        y=self.data[col],
                        name=name,
                        line=dict(color=color, width=1),
                        visible="legendonly",
                    ),
                    row=1,
                    col=1,
                )

    def _add_golden_ratio_traces(self, fig: go.Figure) -> None:
        """Add Golden Ratio multiplier lines to the chart."""
        golden_colors = COLORS["golden_colors"]
        for i, m in enumerate(self.config.golden_multipliers):
            col_name = f"Golden_{m}"
            if col_name in self.data.columns:
                fig.add_trace(
                    go.Scatter(
                        x=self.data.index,
                        y=self.data[col_name],
                        name=f"Golden x{m}",
                        line=dict(
                            color=golden_colors[i % len(golden_colors)],
                            width=CHART_STYLE["line_width"],
                        ),
                        visible="legendonly",
                        hovertemplate=f"Golden x{m}: %{{y:,.2f}}<extra></extra>",
                    ),
                    row=1,
                    col=1,
                )

    def _add_volume_trace(self, fig: go.Figure) -> None:
        """Add color-coded volume bars to the chart."""
        # Calculate colors based on price change
        price_change = self.data["Close"].diff()
        volume_colors = np.where(
            price_change >= 0,
            COLORS["volume_up"],
            COLORS["volume_down"],
        )
        
        fig.add_trace(
            go.Bar(
                x=self.data.index,
                y=self.data["Volume"],
                name="Volume",
                marker=dict(
                    color=volume_colors,
                    line=dict(width=0),
                ),
                hovertemplate="Volume: %{y:,.0f}<extra></extra>",
            ),
            row=2,
            col=1,
        )

    def _add_fear_greed_trace(self, fig: go.Figure) -> None:
        """Add Fear and Greed indicator to the chart."""
        colors = np.where(
            self.data["fgi"] >= 0,
            COLORS["bullish_fill"],
            COLORS["bearish_fill"],
        )
        fig.add_trace(
            go.Bar(
                x=self.data.index,
                y=self.data["fgi"],
                name="Fear & Greed",
                marker=dict(color=colors, line=dict(width=0)),
                hovertemplate="F&G: %{y:.2f}<extra></extra>",
            ),
            row=3,
            col=1,
        )

    def _add_macd_traces(self, fig: go.Figure) -> None:
        """Add MACD indicator to the chart."""
        # MACD histogram (add first so it's behind the lines)
        hist_colors = np.where(
            self.data["macd_hist"] >= 0,
            COLORS["macd_hist_up"],
            COLORS["macd_hist_down"],
        )
        fig.add_trace(
            go.Bar(
                x=self.data.index,
                y=self.data["macd_hist"],
                name="Histogram",
                marker=dict(color=hist_colors, line=dict(width=0)),
                hovertemplate="Hist: %{y:.4f}<extra></extra>",
                showlegend=False,
            ),
            row=4,
            col=1,
        )
        
        # MACD line
        fig.add_trace(
            go.Scatter(
                x=self.data.index,
                y=self.data["macd"],
                name="MACD",
                line=dict(color=COLORS["macd_line"], width=CHART_STYLE["line_width"]),
                hovertemplate="MACD: %{y:.4f}<extra></extra>",
            ),
            row=4,
            col=1,
        )

        # Signal line
        fig.add_trace(
            go.Scatter(
                x=self.data.index,
                y=self.data["macd_signal"],
                name="Signal",
                line=dict(color=COLORS["macd_signal"], width=CHART_STYLE["line_width"]),
                hovertemplate="Signal: %{y:.4f}<extra></extra>",
            ),
            row=4,
            col=1,
        )

    def _add_rsi_traces(self, fig: go.Figure) -> None:
        """Add RSI indicator with zones to the chart."""
        cfg = self.config.rsi

        # RSI line
        fig.add_trace(
            go.Scatter(
                x=self.data.index,
                y=self.data["rsi"],
                name="RSI",
                line=dict(color=COLORS["rsi"], width=CHART_STYLE["line_width"]),
                fill="tozeroy",
                fillcolor="rgba(177, 156, 217, 0.1)",
                hovertemplate="RSI: %{y:.1f}<extra></extra>",
            ),
            row=5,
            col=1,
        )

        # Overbought zone (70-100)
        fig.add_hrect(
            y0=cfg.overbought,
            y1=100,
            fillcolor=COLORS["rsi_overbought"],
            line_width=0,
            row=5,
            col=1,
        )
        
        # Oversold zone (0-30)
        fig.add_hrect(
            y0=0,
            y1=cfg.oversold,
            fillcolor=COLORS["rsi_oversold"],
            line_width=0,
            row=5,
            col=1,
        )
        
        # Middle line (50)
        fig.add_hline(
            y=50,
            line_dash="dot",
            line_color=COLORS["rsi_middle"],
            line_width=1,
            row=5,
            col=1,
        )

    def _add_halving_events(self, fig: go.Figure) -> list[dict[str, Any]]:
        """Add Bitcoin halving event markers."""
        shapes = []
        annotations = []

        for date, label in BITCOIN_HALVING_EVENTS:
            if date <= self.data.index.max():
                shapes.append(
                    dict(
                        type="line",
                        xref="x",
                        yref="paper",
                        x0=date,
                        y0=0,
                        x1=date,
                        y1=1,
                        line=dict(color=COLORS["halving"], width=1, dash="dash"),
                    )
                )

                annotations.append(
                    dict(
                        x=date,
                        y=0.02,
                        xref="x",
                        yref="paper",
                        text=label,
                        showarrow=False,
                        textangle=90,
                        align="left",
                        font=dict(color=COLORS["halving"]),
                    )
                )

        return shapes, annotations

    def build(self) -> go.Figure:
        """
        Build the complete interactive chart.

        Returns:
            Plotly Figure object.
        """
        # Create subplots with improved spacing
        fig = make_subplots(
            rows=5,
            cols=1,
            shared_xaxes=True,
            vertical_spacing=0.03,
            row_heights=[0.40, 0.12, 0.12, 0.18, 0.18],
            subplot_titles=(
                "",  # Will set custom title
                "📊 Volume",
                "😰 Fear & Greed",
                "📈 MACD",
                "💪 RSI",
            ),
        )

        # Add all traces
        self._add_price_trace(fig)
        self._add_sma_traces(fig)
        self._add_bollinger_bands(fig)
        self._add_pi_cycle_traces(fig)
        self._add_golden_ratio_traces(fig)
        self._add_volume_trace(fig)
        self._add_fear_greed_trace(fig)
        self._add_macd_traces(fig)
        self._add_rsi_traces(fig)

        # Add halving events for Bitcoin
        shapes, annotations = [], []
        if self.show_halving_events and "BTC" in self.ticker.upper():
            shapes, annotations = self._add_halving_events(fig)

        # Calculate price stats for subtitle
        current_price = self.data["Close"].iloc[-1]
        price_change_pct = (
            (self.data["Close"].iloc[-1] / self.data["Close"].iloc[0] - 1) * 100
        )
        
        # Update layout with modern styling
        fig.update_layout(
            # Title styling
            title=dict(
                text=f"<b>{self.ticker}</b> Technical Analysis",
                font=dict(
                    family=CHART_STYLE["font_family"],
                    size=CHART_STYLE["title_font_size"],
                    color="#FFFFFF",
                ),
                x=0.5,
                xanchor="center",
            ),
            
            # Use dark template as base
            template="plotly_dark",
            
            # Background colors
            paper_bgcolor="rgba(13, 17, 23, 1)",
            plot_bgcolor="rgba(22, 27, 34, 1)",
            
            # Font styling
            font=dict(
                family=CHART_STYLE["font_family"],
                size=CHART_STYLE["axis_font_size"],
                color="#8B949E",
            ),
            
            # Y-axis styling
            yaxis=dict(
                title=dict(text="Price (USD)", font=dict(size=12)),
                type="log",
                gridcolor=COLORS["grid"],
                zerolinecolor=COLORS["grid"],
                tickformat=",.0f",
            ),
            yaxis2=dict(
                title=dict(text="", font=dict(size=10)),
                showgrid=False,
                tickformat=".2s",
            ),
            yaxis3=dict(
                title=dict(text="", font=dict(size=10)),
                showgrid=False,
                zeroline=True,
                zerolinecolor="rgba(255,255,255,0.3)",
            ),
            yaxis4=dict(
                title=dict(text="", font=dict(size=10)),
                gridcolor=COLORS["grid"],
                zeroline=True,
                zerolinecolor="rgba(255,255,255,0.3)",
            ),
            yaxis5=dict(
                title=dict(text="", font=dict(size=10)),
                gridcolor=COLORS["grid"],
                range=[0, 100],
            ),
            
            # X-axis with range slider
            xaxis5=dict(
                title=dict(text="", font=dict(size=10)),
                rangeslider=dict(
                    visible=True,
                    thickness=0.03,
                    bgcolor="rgba(22, 27, 34, 0.8)",
                ),
                rangeselector=dict(
                    buttons=[
                        dict(count=1, label="1M", step="month", stepmode="backward"),
                        dict(count=3, label="3M", step="month", stepmode="backward"),
                        dict(count=6, label="6M", step="month", stepmode="backward"),
                        dict(count=1, label="1Y", step="year", stepmode="backward"),
                        dict(count=2, label="2Y", step="year", stepmode="backward"),
                        dict(step="all", label="All"),
                    ],
                    bgcolor="rgba(22, 27, 34, 0.9)",
                    activecolor=COLORS["bullish"],
                    font=dict(color="#FFFFFF", size=10),
                    x=0,
                    y=1.02,
                ),
            ),
            
            # Legend styling
            showlegend=True,
            legend=dict(
                orientation="h",
                yanchor="bottom",
                y=1.02,
                xanchor="right",
                x=1,
                bgcolor="rgba(22, 27, 34, 0.8)",
                bordercolor="rgba(255,255,255,0.1)",
                borderwidth=1,
                font=dict(size=CHART_STYLE["legend_font_size"]),
            ),
            
            # Hover styling
            hovermode="x unified",
            hoverlabel=dict(
                bgcolor="rgba(22, 27, 34, 0.95)",
                font=dict(family=CHART_STYLE["font_family"], size=12, color="#FFFFFF"),
                bordercolor="rgba(255,255,255,0.2)",
            ),
            
            # Shapes and annotations
            shapes=shapes,
            annotations=annotations,
            
            # Margins
            margin=dict(l=60, r=40, t=100, b=60),
            
            # Height
            height=1000,
        )
        
        # Update subplot title styling
        for annotation in fig.layout.annotations:
            if annotation.text:
                annotation.font = dict(
                    family=CHART_STYLE["font_family"],
                    size=CHART_STYLE["subtitle_font_size"],
                    color="#8B949E",
                )

        # Hide rangeslider for candlestick
        fig.update_xaxes(rangeslider_visible=False, row=1, col=1)

        self.fig = fig
        return fig


# =============================================================================
# Main Interface Class
# =============================================================================


class InteractiveTechnicalAnalysis:
    """
    Main interface for creating interactive technical analysis charts.

    This class provides a high-level API for fetching data, calculating
    indicators, and creating interactive visualizations.

    Example:
        >>> chart = InteractiveTechnicalAnalysis("BTC-USD")
        >>> chart.show()

        >>> # With custom configuration
        >>> from interactive_plot_plotly import IndicatorConfig, MAConfig
        >>> config = IndicatorConfig(ma=MAConfig(periods={"SMA_50": 50, "SMA_200": 200}))
        >>> chart = InteractiveTechnicalAnalysis("AAPL", config=config)
        >>> chart.save_html("apple_chart.html")
    """

    def __init__(
        self,
        ticker: str = DEFAULT_TICKER,
        start_date: str | dt.datetime | None = None,
        end_date: str | dt.datetime | None = None,
        config: IndicatorConfig | None = None,
        use_cache: bool = True,
        show_halving_events: bool = True,
    ):
        """
        Initialize the technical analysis chart.

        Args:
            ticker: Ticker symbol (e.g., 'BTC-USD', 'AAPL', 'GOOGL').
            start_date: Start date for data (string or datetime). Defaults to 2011-10-28.
            end_date: End date for data (string or datetime). Defaults to today.
            config: Custom indicator configuration. Defaults to standard config.
            use_cache: Whether to cache downloaded data. Defaults to True.
            show_halving_events: Whether to show Bitcoin halving events. Defaults to True.
        """
        self.ticker = ticker.upper()
        self.config = config or IndicatorConfig()
        self.use_cache = use_cache
        self.show_halving_events = show_halving_events

        # Parse dates
        self.start_date = self._parse_date(start_date) or DEFAULT_START_DATE
        self.end_date = self._parse_date(end_date) or dt.datetime.now()

        # Initialize components
        self.data: pd.DataFrame | None = None
        self.fig: go.Figure | None = None

        # Build the chart
        self._build()

    @staticmethod
    def _parse_date(date_input: str | dt.datetime | None) -> dt.datetime | None:
        """Parse date input to datetime object."""
        if date_input is None:
            return None
        if isinstance(date_input, dt.datetime):
            return date_input
        if isinstance(date_input, str):
            return dt.datetime.fromisoformat(date_input)
        raise ValueError(f"Invalid date format: {date_input}")

    def _build(self) -> None:
        """Fetch data, calculate indicators, and build the chart."""
        # Fetch data
        fetcher = DataFetcher(use_cache=self.use_cache)
        self.data = fetcher.fetch(self.ticker, self.start_date, self.end_date)

        # Calculate indicators
        calculator = IndicatorCalculator(self.data, self.config)
        self.data = calculator.calculate_all()

        # Build plot
        builder = PlotBuilder(
            self.data,
            self.ticker,
            self.config,
            show_halving_events=self.show_halving_events,
        )
        self.fig = builder.build()

    def show(self) -> None:
        """Display the interactive plot in a browser."""
        if self.fig is None:
            raise RuntimeError("Chart not built. Call _build() first.")
        self.fig.show()

    def save_html(self, filename: str = "technical_analysis.html") -> None:
        """
        Save the chart as an interactive HTML file.

        Args:
            filename: Output filename.
        """
        if self.fig is None:
            raise RuntimeError("Chart not built. Call _build() first.")
        self.fig.write_html(filename, include_plotlyjs="cdn")
        logger.info(f"Chart saved to {filename}")


    def get_html(self, full_html: bool = False, include_plotlyjs: str = "cdn") -> str:
        """
        Get the chart as an interactive HTML string.

        Args:
            full_html: Whether to return a full HTML document.
            include_plotlyjs: How to include Plotly.js (e.g., 'cdn', True, False).

        Returns:
            HTML string for embedding.
        """
        return self.fig.to_html(
            full_html=full_html, 
            include_plotlyjs=include_plotlyjs,
            div_id="plotly-chart"
        )

    def get_summary_stats(self) -> Dict[str, Any]:
        """
        Calculate summary statistics for the dashboard.
        
        Returns:
            Dictionary with current price, changes, and trend info.
        """
        if self.data is None or self.data.empty:
            return {}
            
        recent = self.data.iloc[-1]
        prev_day = self.data.iloc[-2] if len(self.data) > 1 else recent
        week_ago = self.data.iloc[-7] if len(self.data) > 7 else self.data.iloc[0]
        
        current_price = recent["Close"]
        change_24h = ((current_price / prev_day["Close"]) - 1) * 100
        change_7d = ((current_price / week_ago["Close"]) - 1) * 100
        
        # Trend detection
        trend = "Neutral"
        if "SMA_50" in self.data.columns and "SMA_200" in self.data.columns:
            sma50 = recent["SMA_50"]
            sma200 = recent["SMA_200"]
            if current_price > sma50 > sma200:
                trend = "Strong Bullish"
            elif current_price > sma50:
                trend = "Bullish"
            elif current_price < sma50 < sma200:
                trend = "Strong Bearish"
            elif current_price < sma50:
                trend = "Bearish"
                
        # RSI Status
        rsi_status = "Neutral"
        if "RSI" in self.data.columns:
            rsi = recent["RSI"]
            if rsi > 70: rsi_status = "Overbought"
            elif rsi < 30: rsi_status = "Oversold"
            
        return {
            "ticker": self.ticker,
            "current_price": float(current_price),
            "change_24h": float(change_24h),
            "change_7d": float(change_7d),
            "volume": float(recent["Volume"]),
            "trend": trend,
            "rsi_status": rsi_status,
            "last_update": self.data.index[-1].strftime("%Y-%m-%d %H:%M")
        }

    def get_data(self) -> pd.DataFrame:
        """
        Get the DataFrame with all calculated indicators.

        Returns:
            DataFrame with OHLCV and indicator data.
        """
        if self.data is None:
            raise RuntimeError("Data not loaded. Call _build() first.")
        return self.data.copy()

    def get_figure(self) -> go.Figure:
        """
        Get the Plotly Figure object.

        Returns:
            Plotly Figure object.
        """
        if self.fig is None:
            raise RuntimeError("Chart not built. Call _build() first.")
        return self.fig


# =============================================================================
# Backwards Compatibility Alias
# =============================================================================

# Alias for backwards compatibility
InteractiveBTCIndicators = InteractiveTechnicalAnalysis


# =============================================================================
# Main Entry Point
# =============================================================================

if __name__ == "__main__":
    # Path for GitHub Pages
    output_dir = Path(__file__).parent.parent / "assets" / "ta_finance"
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / "index.html"

    # Example usage - use recent date range for faster rendering
    chart = InteractiveTechnicalAnalysis(
        ticker="BTC-USD",
        start_date="2023-01-01",  # Recent data for faster rendering
        use_cache=True,
    )
    
    # Save for GitHub Pages
    print(f"Generating chart and saving to {output_path}...")
    chart.save_html(str(output_path))
    print("Done!")
    
    # Optional: also show it
    # chart.show()