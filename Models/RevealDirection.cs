namespace Portfolio.Models;

public enum RevealDirection {
    Up,
    Down,
    Left,
    Right,
    Scale
}

public static class RevealDirectionExtensions {
    public static string ToAttribute(this RevealDirection direction) {
        return direction switch {
            RevealDirection.Up => "up",
            RevealDirection.Down => "down",
            RevealDirection.Left => "left",
            RevealDirection.Right => "right",
            RevealDirection.Scale => "scale",
            _ => "up"
        };
    }
}