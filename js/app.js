/* LIDERARH Check — protótipo navegável
   Só navegação entre telas + pequenas simulações de estado (em memória, some ao recarregar).
   Nada aqui salva em servidor nem em localStorage — é intencional, é um protótipo de fluxo. */
$(function () {

  var estado = {
    checkin: { entrada: false, saida: false },
    historico: [3, 4, 5, 2, 4, 5, 4] // valores fake de humor dos últimos 7 dias (1 a 5)
  };

  function mostrarTela(id) {
    $(".screen").removeClass("active");
    var $tela = $("#screen-" + id).addClass("active");
    var $body = $tela.find(".screen-body");
    if ($body.length) $body.scrollTop(0);
    $("#demo-jump").val(id);
  }

  function toast(msg) {
    var $t = $("#toast").text(msg);
    $t.addClass("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { $t.removeClass("show"); }, 2400);
  }

  // Navegação por botões com data-goto (algumas linhas também carregam data-empresa,
  // usado só pra personalizar o cabeçalho do painel ao entrar vindo da administração)
  $(document).on("click", "[data-goto]", function () {
    var empresa = $(this).data("empresa");
    if (empresa) $("#painel-empresa-nome").text(empresa);
    mostrarTela($(this).data("goto"));
  });

  // Botões que não têm ação real neste protótipo (envio de e-mail, reagendamento,
  // cadastro de empresa, convite de colaborador etc.) — todos avisam via toast.
  $(document).on("click", ".btn-fake-action", function () {
    toast("Esta ação não está conectada neste protótipo — é só para validar o fluxo.");
  });

  // Atalho de demonstração
  $("#demo-jump").on("change", function () {
    var v = $(this).val();
    if (v) mostrarTela(v);
  });

  // ---- Seleção de humor (check-in) ----
  $("#mood-chips").on("click", ".mood-chip", function () {
    $(".mood-chip").removeClass("selected");
    $(this).addClass("selected");
    $("#btn-registrar-checkin").prop("disabled", false).text("Registrar");
  });

  // ---- Botão "Registrar chegada/saída" na home do funcionário ----
  $("#btn-fazer-checkin").on("click", function () {
    var modo = estado.checkin.entrada ? "saida" : "entrada";

    if (modo === "entrada") {
      $("#checkin-titulo").text("Como você está chegando hoje?");
    } else {
      $("#checkin-titulo").text("Como foi o seu dia hoje?");
    }
    // reseta seleção da tela de check-in
    $(".mood-chip").removeClass("selected");
    $("#btn-registrar-checkin").prop("disabled", true).text("Selecione uma opção").data("modo", modo);
    mostrarTela("func-checkin");
  });

  // ---- Confirmar check-in ----
  $("#btn-registrar-checkin").on("click", function () {
    var modo = $(this).data("modo") || "entrada";
    var humor = $(".mood-chip.selected").data("mood") || "Neutro";

    estado.checkin[modo] = true;

    if (modo === "entrada") {
      $("#status-entrada").removeClass("status-pending").addClass("status-done").text("Registrado");
      $("#sucesso-titulo").text("Chegada registrada");
      $("#sucesso-texto").text("Check-in de chegada (" + humor + ") registrado com carinho. Bom trabalho hoje!");
    } else {
      $("#status-saida").removeClass("status-pending").addClass("status-done").text("Registrado");
      $("#sucesso-titulo").text("Saída registrada");
      $("#sucesso-texto").text("Obrigado por compartilhar como foi seu dia (" + humor + "). Até amanhã!");
    }

    atualizarBotaoHome();
    mostrarTela("func-sucesso");
  });

  function atualizarBotaoHome() {
    var $btn = $("#btn-fazer-checkin");
    if (estado.checkin.entrada && estado.checkin.saida) {
      $btn.prop("disabled", true).text("Check-ins de hoje concluídos");
    } else if (estado.checkin.entrada) {
      $btn.prop("disabled", false).text("Registrar saída");
    } else {
      $btn.prop("disabled", false).text("Registrar chegada");
    }
  }

  // ---- Histórico (barras) na home do funcionário ----
  // altura em px (não %) porque o wrapper de cada barra não tem altura própria definida,
  // e % de altura só resolve contra um ancestral com altura explícita.
  function montarHistorico() {
    var $wrap = $("#func-historico").empty();
    var dias = ["S", "T", "Q", "Q", "S", "S", "D"];
    var alturaMaxPx = 40;
    estado.historico.forEach(function (v, i) {
      var alturaPx = Math.max(6, (v / 5) * alturaMaxPx);
      var atual = i === estado.historico.length - 1;
      $wrap.append(
        $("<div>").addClass("flex-1 flex flex-col items-center justify-end gap-1 h-full")
          .append($("<div>").addClass("bar w-full" + (atual ? " bar-current" : "")).css("height", alturaPx + "px"))
          .append($("<span>").addClass("text-[9px] text-gray-400").text(dias[i]))
      );
    });
  }

  // ---- Porte da empresa (onboarding RH) ----
  $("#porte-empresa").on("click", ".option-chip", function () {
    $("#porte-empresa .option-chip").removeClass("selected");
    $(this).addClass("selected");
  });

  // ---- Plano contratado (onboarding RH) ----
  $("#plano-empresa").on("click", ".option-chip", function () {
    $("#plano-empresa .option-chip").removeClass("selected");
    $(this).addClass("selected");
  });

  // ---- Filtro de usuários (admin) — só visual, a lista não muda neste protótipo ----
  $("#filtro-usuarios").on("click", ".option-chip", function () {
    $("#filtro-usuarios .option-chip").removeClass("selected");
    $(this).addClass("selected");
  });

  // ---- Detalhe da equipe ----
  $(document).on("click", ".equipe-row, [data-equipe]", function () {
    var nome = $(this).data("equipe");
    var risco = $(this).data("risco");
    if (!nome) return;
    $("#equipe-nome").text(nome);
    $("#equipe-risco").text(risco);
  });

  // ---- Baixar PDF (fake) ----
  $("#btn-baixar-pdf").on("click", function () {
    toast("Neste protótipo o PDF não é gerado de verdade — na versão final, baixa aqui.");
  });

  // ---- Data de hoje nos textos ----
  var hoje = new Date();
  var opcoes = { day: "numeric", month: "long", year: "numeric", weekday: "long" };
  var textoData = hoje.toLocaleDateString("pt-BR", opcoes);
  $("#func-data-hoje").text("Hoje · " + textoData);
  $("#checkin-data").text(textoData.charAt(0).toUpperCase() + textoData.slice(1));

  montarHistorico();
  mostrarTela("login");
});
