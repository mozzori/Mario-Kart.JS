const personagens = [
  {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
  },
  {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
  },
  {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 5,
    PODER: 2,
    PONTOS: 0,
  },
  {
    NOME: "Bowser",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 6,
    PONTOS: 0,
  },
  {
    NOME: "Yoshi",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
  },
  {
    NOME: "Donkey Kong",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
  },
];

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    // rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(
        character1.NOME,
        "velocidade",
        diceResult1,
        character1.VELOCIDADE
      );

      await logRollResult(
        character2.NOME,
        "velocidade",
        diceResult2,
        character2.VELOCIDADE
      );
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "manobrabilidade",
        diceResult1,
        character1.MANOBRABILIDADE
      );

      await logRollResult(
        character2.NOME,
        "manobrabilidade",
        diceResult2,
        character2.MANOBRABILIDADE
      );
    }

    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

      await logRollResult(
        character1.NOME,
        "poder",
        diceResult1,
        character1.PODER
      );

      await logRollResult(
        character2.NOME,
        "poder",
        diceResult2,
        character2.PODER
      );

      if (powerResult1 > powerResult2) {
        if (character2.PONTOS > 0) {
          console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`);
          character2.PONTOS--;
        } else {
          console.log(`${character1.NOME} venceu o confronto! Mas ${character2.NOME} não tinha pontos para perder.`);
        }
      }

      if (powerResult2 > powerResult1) {
        if (character1.PONTOS > 0) {
          console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`);
          character1.PONTOS--;
        } else {
          console.log(`${character2.NOME} venceu o confronto! Mas ${character1.NOME} não tinha pontos para perder.`);
        }
      }

      if (powerResult1 === powerResult2) {
        console.log("Confronto empatado! Nenhum ponto foi perdido");
      }
    }

    // verificando o vencedor
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }

    console.log("-----------------------------");
  }
}

async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS)
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
  else if (character2.PONTOS > character1.PONTOS)
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
  else console.log("A corrida terminou em empate");
}
// Função de escolha dos personagens (multiplayer local)
const readline = require("readline");

async function escolherPersonagens() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const perguntar = (pergunta) =>
    new Promise((resolve) => rl.question(pergunta, resolve));

  function exibirPersonagens(lista) {
    lista.forEach((p, i) =>
      console.log(`${i + 1} - ${p.NOME} (Velocidade: ${p.VELOCIDADE}, Manobrabilidade: ${p.MANOBRABILIDADE}, Poder: ${p.PODER})`)
    );
  }

  console.log("\n🎮 Jogador 1, escolha seu personagem:");
  exibirPersonagens(personagens);

  let index1;
  while (true) {
    const resposta1 = await perguntar("Digite o número do personagem: ");
    index1 = parseInt(resposta1) - 1;
    if (index1 >= 0 && index1 < personagens.length) break;
    console.log("❌ Escolha inválida. Tente novamente.");
  }

  const personagem1 = { ...personagens[index1] };
  const restantes = personagens.filter((_, i) => i !== index1);

  console.log("\n🎮 Jogador 2, escolha seu personagem:");
  exibirPersonagens(restantes);

  let index2;
  while (true) {
    const resposta2 = await perguntar("Digite o número do personagem: ");
    index2 = parseInt(resposta2) - 1;
    if (index2 >= 0 && index2 < restantes.length) break;
    console.log("❌ Escolha inválida. Tente novamente.");
  }

  const personagem2 = { ...restantes[index2] };

  rl.close();
  return [personagem1, personagem2];
}

(async function main() {
  const [jogador1, jogador2] = await escolherPersonagens();

  console.log(
    `🏁🚨 Corrida entre ${jogador1.NOME} e ${jogador2.NOME} começando...\n`
  );

  await playRaceEngine(jogador1, jogador2);
  await declareWinner(jogador1, jogador2);
})();