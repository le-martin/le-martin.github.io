# Handle Ruby 3.2+ compatibility for older Jekyll/Liquid
# These methods were deprecated in Ruby 2.7 and removed in 3.2.
if RUBY_VERSION >= '3.2'
  class Object
    def tainted?
      false
    end

    def taint
      self
    end

    def untaint
      self
    end
  end
end
