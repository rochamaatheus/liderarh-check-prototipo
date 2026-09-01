# LIDERARH Check: Protótipo navegável

Protótipo clicável do aplicativo **LIDERARH Check** (check-in emocional + mapeamento de riscos
psicossociais para adequação à NR-01), feito para validar o fluxo de telas com a cliente antes do
orçamento e desenvolvimento completo. Combinado na reunião de alinhamento de 31/08/2026.

**Acesse:** https://rochamaatheus.github.io/liderarh-check-prototipo/

## O que é (e o que não é)

- É um protótipo **não funcional**: nenhuma tela salva dado em banco nenhum, não há login real,
  não gera PDF nem envia e-mail de verdade. Serve só pra clicar e visualizar o comportamento.
- **É um site de verdade**, não um app nativo, só que otimizado exclusivamente para largura de
  celular (não tem moldura de hardware simulada; em telas largas o conteúdo fica centralizado
  numa coluna do tamanho de um celular, como qualquer site mobile-only se comporta no desktop).
- Cobre os três perfis de acesso: **funcionário** (check-in duplo, entrada e saída),
  **RH/líder** (cadastro da empresa, colaboradores, painel de risco, relatório NR-01, agenda de
  consultoria) e **administradora** (visão da Camila sobre todas as empresas clientes,
  todos os usuários e a agenda geral de palestras).
- A tela do RH/líder está representada no mesmo formato mobile por simplicidade de protótipo.
  Se o painel final vai ser mobile ou acessado pelo navegador num computador ainda é uma decisão
  em aberto com a cliente.
- **Paleta intencionalmente monocromática** (branco, cinzas, preto) e sem tipografia definida.
  Isso não é a identidade visual final, é pra não misturar validação de fluxo com decisão de
  marca/cor.

## Telas

| Perfil | Telas |
|---|---|
| Login | Seleção de acesso (funcionário / RH-líder / administradora) |
| Funcionário | Início (status dos check-ins do dia), Check-in (entrada e saída), Confirmação |
| RH / Líder | Cadastro da empresa, Colaboradores, Painel de risco, Detalhe por equipe, Relatório NR-01, Agenda de consultoria |
| Administradora (Camila) | Visão geral (métricas entre empresas), Empresas clientes, Usuários, Agenda geral |

## Tecnologia

HTML + [Tailwind CSS](https://tailwindcss.com) (via CDN) + [jQuery](https://jquery.com), tudo em
um único `index.html` com as telas como seções alternadas por JS. Sem build step, sem dependência
de servidor. Abre direto no navegador ou publica no GitHub Pages.

## Rodando localmente

Só abrir `index.html` no navegador. Não precisa de servidor nem instalação.
