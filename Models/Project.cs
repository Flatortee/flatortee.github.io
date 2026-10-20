namespace Portfolio.Models;

public enum ProjectKind {
    Game,
    Engine,
    UnityPlugin,
    Application
}

public sealed record Project(
    string Title,
    string Description,
    ProjectKind Kind,
    IReadOnlyList<string> Tags,
    Uri? RepoUrl = null,
    Uri? LiveUrl = null,
    bool Featured = false) {
    public int Year {
        get;
        init => field = Math.Clamp(value, 2000, DateTime.UtcNow.Year + 1);
    } = DateTime.UtcNow.Year;

    public string Monogram { get; } = Title is [var first, ..] ? char.ToUpperInvariant(first).ToString() : "?";

    public string KindLabel { get; } = Kind switch {
        ProjectKind.Game => "Web",
        ProjectKind.Engine => "Mobile",
        ProjectKind.UnityPlugin => "Backend",
        ProjectKind.Application => "Open source",
        _ => "Projet"
    };

    // Tailwind
    public string GradientClass { get; } = Kind switch {
        ProjectKind.Game => "from-violet-500/30 to-cyan-400/10",
        ProjectKind.Engine => "from-pink-500/30 to-orange-400/10",
        ProjectKind.UnityPlugin => "from-emerald-500/30 to-cyan-400/10",
        ProjectKind.Application => "from-amber-500/30 to-rose-400/10",
        _ => "from-slate-500/30 to-slate-400/10"
    };

    public string TextAccentClass { get; } = Kind switch {
        ProjectKind.Game => "text-violet-300",
        ProjectKind.Engine => "text-pink-300",
        ProjectKind.UnityPlugin => "text-emerald-300",
        ProjectKind.Application => "text-amber-300",
        _ => "text-slate-300"
    };
}