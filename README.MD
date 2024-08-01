# Estrutura
`example-app`  é o backend em Laravel.

`front-end` é o app em React.  

O ambiente de desenvolvimento foi MacOS 14.4.1 (23E224) Sonoma.

# Como rodar
- git clone \<repo>
- cd \<repo>
- docker compose up

Infelizmente ocorre um bug do vite no front end que causa um leak de memória. Outras pessoas já tiveram esse erro e vou tentar solucioná-lo em breve.

Ressalto que isso só ocorre no Docker e não localmente.

A melhor alternativa para rodar o front é:
- cd front-end
- npm install
- npm run dev

versão do npm: 10.5.0
versão do node: v21.7.1


O backend funcionou de boa no docker.

(Não mexi muito no .gitignore e nem limpei algumas coisas geradas como o react.svg então desculpa se não estiver muito apresentável)

# Imagem
![Imagem do projeto](./Imagem%20do%20projeto.png)