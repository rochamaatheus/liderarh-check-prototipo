# LIDERARH Check — Protótipo navegável

Protótipo clicável do aplicativo **LIDERARH Check** (check-in emocional + mapeamento de riscos
psicossociais para adequação à NR-01), feito para validar o fluxo de telas com a cliente antes do
orçamento e desenvolvimento completo — combinado na reunião de alinhamento de 31/08/2026.

**Acesse:** https://rochamaatheus.github.io/liderarh-check-prototipo/

## O que é (e o que não é)

- É um protótipo **não funcional**: nenhuma tela salva dado em banco nenhum, não há login real,
  não gera PDF nem envia e-mail de verdade. Serve só pra clicar e visualizar o comportamento.
- Cobre os dois perfis de acesso (funcionário e RH/líder), o check-in duplo (entrada e saída),
  o painel de risco, o detalhe por equipe, o relatório NR-01 e a agenda de consultoria recorrente.
- A tela do RH/líder está representada dentro do mesmo formato de app mobile por simplicidade de
  protótipo — se o painel final vai ser mobile ou acessado pelo navegador num computador ainda é
  uma decisão em aberto com a cliente.
- **Paleta intencionalmente monocromática** (branco, cinzas, preto) e sem tipografia definida —
  isso não é a identidade visual final, é pra não misturar validação de fluxo com decisão de
  marca/cor.

## Telas

| Perfil | Telas |
|---|---|
| Login | Seleção de acesso (funcionário / RH-líder) |
| Funcionário | Início (status dos check-ins do dia), Check-in (entrada e saída), Confirmação |
| RH / Líder | Cadastro da empresa, Painel de risco, Detalhe por equipe, Relatório NR-01, Agenda de consultoria |

## Tecnologia

HTML + [Tailwind CSS](https://tailwindcss.com) (via CDN) + [jQuery](https://jquery.com) — tudo em
um único `index.html` com as telas como seções alternadas por JS, dentro de uma moldura de
celular. Sem build step, sem dependência de servidor — abre direto no navegador ou publica no
GitHub Pages.

## Rodando localmente

Só abrir `index.html` no navegador. Não precisa de servidor nem instalação.
