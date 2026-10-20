using Microsoft.JSInterop;

namespace Portfolio.Services;

public sealed record LenisOptions(double Duration = 1.1, bool SmoothWheel = true);

public sealed class LenisService(IJSRuntime js) : IAsyncDisposable {
    private bool _started;

    private Task<IJSObjectReference> Module =>
        field ??= js.InvokeAsync<IJSObjectReference>("import", "./js/lenis-interop.js").AsTask();

    public async ValueTask DisposeAsync() {
        if (!_started) return;
        try {
            IJSObjectReference module = await Module;
            await module.InvokeVoidAsync("destroy");
            await module.DisposeAsync();
        }
        catch (JSException) {
            /* page en cours de fermeture */
        }
    }

    public async ValueTask<bool> InitAsync(LenisOptions? options = null) {
        if (_started) return true;
        IJSObjectReference module = await Module;
        _started = await module.InvokeAsync<bool>("init", options ?? new LenisOptions());
        return _started;
    }

    public async ValueTask ScrollToAsync(string selector, int offset = 0, bool immediate = false) {
        await (await Module).InvokeVoidAsync("scrollTo", selector, immediate, offset);
    }

    public async ValueTask ScrollToTopAsync(bool immediate = true) {
        await (await Module).InvokeVoidAsync("scrollTo", 0, immediate, 0);
    }

    public async ValueTask StopAsync() {
        await (await Module).InvokeVoidAsync("stop");
    }

    public async ValueTask StartAsync() {
        await (await Module).InvokeVoidAsync("start");
    }
}