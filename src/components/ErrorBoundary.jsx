import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Keep this even in production — a silent failure is worse than a
    // console entry, and it costs nothing at this scale.
    console.error("Portfolio crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-base text-ink">
          <div className="text-center max-w-md">
            <p className="font-mono text-sm text-signal mb-3">something broke</p>
            <h1 className="font-display text-2xl mb-4">
              This part of the page hit an error.
            </h1>
            <p className="text-muted text-sm mb-6">
              Refreshing usually fixes it. If it keeps happening, reach out
              directly at{" "}
              <a href="mailto:abdulhaq.swe@gmail.com" className="text-signal hover:underline">
                abdulhaq.swe@gmail.com
              </a>
              .
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-signal text-oncolor font-medium text-sm px-6 py-3 rounded-sm hover:bg-signalDim transition-colors"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
