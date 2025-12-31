import logging
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import uvicorn
from interactive_plot_plotly import InteractiveTechnicalAnalysis

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Finance Analysis Dashboard")

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Configure templates
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def index(request: Request, ticker: str = "BTC-USD"):
    """Render the dashboard home page."""
    try:
        # Build initial chart
        chart = InteractiveTechnicalAnalysis(ticker=ticker, use_cache=True)
        chart_html = chart.get_html(include_plotlyjs="cdn")
        stats = chart.get_summary_stats()
        
        return templates.TemplateResponse(
            "index.html",
            {
                "request": request,
                "ticker": ticker,
                "chart_html": chart_html,
                "stats": stats
            }
        )
    except Exception as e:
        logger.error(f"Error building initial chart for {ticker}: {e}")
        return templates.TemplateResponse(
            "index.html",
            {
                "request": request,
                "ticker": ticker,
                "chart_html": f"<div style='color: #ff6b6b; padding: 2rem;'>Error: {str(e)}</div>",
                "stats": None
            }
        )

@app.get("/api/chart/{ticker}")
async def get_chart(ticker: str):
    """API endpoint to get chart HTML and stats for a ticker."""
    try:
        logger.info(f"Generating data for ticker: {ticker}")
        chart = InteractiveTechnicalAnalysis(ticker=ticker, use_cache=True)
        chart_html = chart.get_html(include_plotlyjs=False)
        stats = chart.get_summary_stats()
        
        # Try to get ML prediction if model exists
        prediction = None
        try:
            from crypto_predict import CryptoPricePredictor, ModelConfig
            from pathlib import Path
            
            model_path = Path("models") / f"{ticker.replace('-', '_')}_model.keras"
            if model_path.exists():
                config = ModelConfig(ticker=ticker)
                predictor = CryptoPricePredictor(config)
                predictor.load(model_path)
                prediction = predictor.predict_next()
                stats["prediction"] = float(prediction)
        except Exception as pred_err:
            logger.debug(f"Could not load prediction for {ticker}: {pred_err}")

        return JSONResponse(content={
            "html": chart_html,
            "stats": stats
        })
    except Exception as e:
        logger.error(f"Error generating chart for {ticker}: {e}")
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
