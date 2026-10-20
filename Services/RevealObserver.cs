using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace Portfolio.Services;

public sealed class RevealObserver(IJSRuntime js) : IAsyncDisposable {
    private Task<IJSObjectReference> Module =>
        field ??= js.InvokeAsync<IJSObjectReference>("import", "./js/reveal.js").AsTask();

    public async ValueTask DisposeAsync() {
        try {
            await (await Module).DisposeAsync();
        }
        catch (JSException) {
        }
    }

    public async ValueTask ObserveAsync(ElementReference element, bool once = true) {
        await (await Module).InvokeVoidAsync("observe", element, once);
    }

    public async ValueTask UnobserveAsync(ElementReference element) {
        try {
            await (await Module).InvokeVoidAsync("unobserve", element);
        }
        catch (JSException) {
        }
    }
}