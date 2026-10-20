using Portfolio.Models;

namespace Portfolio.Data;

//TODO: Mes Projects ICI
public static class ProjectCatalog {
    private static readonly IReadOnlyList<Project> All = [
        new("Nanally Engine", "PAS DE DESCRIPTION POUR LE MOMENT", ProjectKind.Engine,
            ["C# 14", "ImGuics"], new Uri("https://github.com/")) { Year = 2026 },

        new("Typhon Engine", "PAS DE DESCRIPTION POUR LE MOMENT", ProjectKind.Engine,
            ["C 23", "Avalonia", "CMake"], new Uri("https://github.com/")) { Year = 2026 },

        new("Neptune Labs", "PAS DE DESCRIPTION POUR LE MOMENT", ProjectKind.Application,
            ["Java 21", "JavaFx"], new Uri("https://github.com/")) { Year = 2025 },

        new("TBS Game", "PAS DE DESCRIPTION POUR LE MOMENT", ProjectKind.Game,
            ["Unity 6.6", "URP"], new Uri("https://github.com/")) { Year = 2026 },
    ];

    public static readonly IReadOnlyList<Project> Featured = [.. All.Where(p => p is { Featured: true })];
    public static readonly IReadOnlyList<ProjectKind> Kinds = Enum.GetValues<ProjectKind>();
    private static readonly Project[] Sorted = [.. All.OrderByDescending(p => p.Year)];

    private static readonly Dictionary<ProjectKind, Project[]> ByKind =
        Kinds.ToDictionary(k => k, k => Sorted.Where(p => p.Kind == k).ToArray());

    public static IReadOnlyList<Project> Filter(ProjectKind? kind) {
        return kind is { } k ? ByKind[k] : Sorted;
    }
}