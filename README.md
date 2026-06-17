# Pepitidios - Clone do Site

Este repositório contém uma cópia local completa do site [pepitidios.vercel.app](https://pepitidios.vercel.app/), incluindo todas as imagens, ícones, fontes, arquivos CSS e JS.

O site está estruturado de forma estática, pronto para ser publicado no GitHub e implantado na Vercel.

## Estrutura do Projeto

```text
├── index.html        # Página principal
├── assets/           # Imagens, SVGs, CSS e JS clonados
└── README.md         # Documentação
```

## Como Rodar Localmente

Como o site é totalmente estático, você pode visualizá-lo de duas formas:

### Opção 1: Abrir diretamente
Basta abrir o arquivo `index.html` em qualquer navegador.

### Opção 2: Servidor local básico (Recomendado)
Para evitar restrições de CORS locais em alguns navegadores, você pode rodar um servidor HTTP local:

#### Usando Python (nativo no macOS)
Execute no terminal da pasta do projeto:
```bash
python3 -m http.server 8000
```
E acesse `http://localhost:8000` no seu navegador.

#### Usando Node (se tiver instalado)
```bash
npx serve .
```
E acesse o link gerado (geralmente `http://localhost:3000`).

## Como Fazer Deploy na Vercel via GitHub

1. **Crie um repositório no seu GitHub**:
   - Vá em [github.com/new](https://github.com/new) e crie um repositório vazio (ex: `pepitidios`).

2. **Suba os arquivos locais**:
   Abra o terminal na pasta do projeto `/Users/matheus/pep` e execute:
   ```bash
   git init
   git add .
   git commit -m "initial commit: cloned landing page"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
   git push -u origin main
   ```

3. **Conecte com a Vercel**:
   - Vá no painel da [Vercel](https://vercel.com/dashboard).
   - Clique em **Add New...** -> **Project**.
   - Importe o repositório que você acabou de subir.
   - Deixe as configurações padrões (o Vercel detectará automaticamente que é um site estático).
   - Clique em **Deploy**.
