{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    kubectl
    kubernetes-helm
    fluxcd
    gh
    kubectx
    kustomize
    oras
    git
    jq
    vault
    nodejs_24
  ];
  shellHook = ''
    echo "Dewordify dev shell — Node.js $(node --version)"
    echo "Run: npm install && npm run build:cli"
    echo "Then: dewordify file.docx  (or: node bin/dewordify.js file.docx)"
  '';
}
