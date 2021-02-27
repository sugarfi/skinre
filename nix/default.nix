let
    pkgs = import <nixpkgs> {};
in
pkgs.mkShell {
    name = "skinre-dev";
    buildInputs = with pkgs; [ chromium nodejs yarn ];
}
