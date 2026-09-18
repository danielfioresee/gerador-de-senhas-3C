<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerador de Senhas</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #111827;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
        }

        .container {
            background: #1f2937;
            padding: 30px;
            border-radius: 15px;
            width: 350px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }

        h1 {
            text-align: center;
        }

        .senha {
            display: flex;
            gap: 8px;
            margin: 20px 0;
        }

        #resultado {
            flex: 1;
            padding: 12px;
            border: none;
            border-radius: 8px;
            background: #374151;
            color: white;
            font-size: 16px;
        }

        button {
            padding: 12px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            background: #3b82f6;
            color: white;
            font-weight: bold;
        }

        button:hover {
            background: #2563eb;
        }

        .opcao {
            margin: 15px 0;
        }

        input[type="range"] {
            width: 100%;
        }

        .gerar {
            width: 100%;
            margin-top: 15px;
        }
    </style>
</head>

<body>

    <div class="container">
        <h1>🔐 Gerador de Senhas</h1>

        <div class="senha">
            <input type="text" id="resultado" readonly>
            <button onclick="copiarSenha()">Copiar</button>
        </div>

        <div class="opcao">
            <label>
                Tamanho: <span id="tamanhoValor">16</span>
            </label>

            <input
                type="range"
                id="tamanho"
                min="4"
                max="50"
                value="16"
            >
        </div>

        <div class="opcao">
            <label>
                <input type="checkbox" id="maiusculas" checked>
                Letras maiúsculas
            </label>
        </div>

        <div class="opcao">
            <label>
                <input type="checkbox" id="minusculas" checked>
                Letras minúsculas
            </label>
        </div>

        <div class="opcao">
            <label>
                <input type="checkbox" id="numeros" checked>
                Números
            </label>
        </div>

        <div class="opcao">
            <label>
                <input type="checkbox" id="simbolos" checked>
                Símbolos
            </label>
        </div>

        <button class="gerar" onclick="gerarSenha()">
            Gerar senha
        </button>
    </div>

    <script>
        const tamanho = document.getElementById("tamanho");
        const tamanhoValor = document.getElementById("tamanhoValor");

        tamanho.addEventListener("input", () => {
            tamanhoValor.textContent = tamanho.value;
        });

        function gerarSenha() {
            const comprimento = Number(tamanho.value);

            const maiusculas = document.getElementById("maiusculas").checked;
            const minusculas = document.getElementById("minusculas").checked;
            const numeros = document.getElementById("numeros").checked;
            const simbolos = document.getElementById("simbolos").checked;

            let caracteres = "";

            if (maiusculas) caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            if (minusculas) caracteres += "abcdefghijklmnopqrstuvwxyz";
            if (numeros) caracteres += "0123456789";
            if (simbolos) caracteres += "!@#$%^&*()_+-=[]{}|;:,.<>?";

            if (caracteres.length === 0) {
                alert("Selecione pelo menos um tipo de caractere.");
                return;
            }

            let senha = "";

            const valores = new Uint32Array(comprimento);
            crypto.getRandomValues(valores);

            for (let i = 0; i < comprimento; i++) {
                senha += caracteres[valores[i] % caracteres.length];
            }

            document.getElementById("resultado").value = senha;
        }

        function copiarSenha() {
            const resultado = document.getElementById("resultado");

            if (!resultado.value) {
                alert("Gere uma senha primeiro!");
                return;
            }

            navigator.clipboard.writeText(resultado.value)
                .then(() => {
                    alert("Senha copiada!");
                });
        }

        // Gera uma senha automaticamente ao abrir o site
        gerarSenha();
    </script>

</body>
</html>
