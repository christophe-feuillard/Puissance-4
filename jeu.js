document.addEventListener('DOMContentLoaded', () => {

  let currentPlayer = "Azir";
  let plateau = document.getElementById("plateau");
  const result = document.querySelector("#result");
  const displayCurrentPlayer = document.querySelector("#current-player");


  
  function creerPlateau(nombres_lignes,nombres_cases) {
  
    for(let i = 1; i <= nombres_lignes; i++) { 
      let ligne = document.createElement("div");
      ligne.classList.add('row');
      plateau.appendChild(ligne);
  
      for(let e = 0; e < nombres_cases; e++) { 
        let cases = document.createElement("div");
        cases.classList.add('cases');
        ligne.appendChild(cases);
        
        if(i == nombres_lignes) {
          cases.classList.add('prise'); 
          cases.classList.add('cases_interdites'); 
        } // J'ai besoin de cases "interdites" pour commencer mon p4 
      } 
    }

  }
  creerPlateau(7,7);




  // Toutes mes conditions de victoire dans cet array
  const winningArrays = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
  ]




  // let audioWin = new Audio("style/Azir.selection.ogg");
  function checkBoard() {

    for (let y = 0; y < winningArrays.length; y++) {
      const case1 = cases[winningArrays[y][0]]
      const case2 = cases[winningArrays[y][1]]
      const case3 = cases[winningArrays[y][2]]
      const case4 = cases[winningArrays[y][3]]

      // Je vérifie que mes cases ont une classe joueur 1 ou joueur 2 
      if (
        case1.classList.contains('joueur-un') &&
        case2.classList.contains('joueur-un') &&
        case3.classList.contains('joueur-un') &&
        case4.classList.contains('joueur-un')
      )
      { result.innerHTML = "Victoire d'Azir"
        result.style.display = 'block';
        // audioWin.play();
        localStorage.setItem('victoire', result.innerHTML);
        setTimeout(function(){
        window.location.reload();
        },3000);
      }
      
      if (
        case1.classList.contains('joueur-deux') &&
        case2.classList.contains('joueur-deux') &&
        case3.classList.contains('joueur-deux') &&
        case4.classList.contains('joueur-deux')
      )
      { result.innerHTML = 'Victoire de Yone' 
        result.style.display = 'block';
        // audioWin.play();
        localStorage.setItem('victoire', result.innerHTML);
        setTimeout(function(){
        window.location.reload();
        },3000);	
      }
    }
  }




  let nombreVictoire = localStorage.getItem('victoire');
  let listeParent = document.querySelector("ul");

  if(nombreVictoire) { 
    let liste = document.createElement("li");
    liste.textContent = nombreVictoire;
    listeParent.appendChild(liste);
  }




  let cases = document.getElementsByClassName("cases");
  //  let audio = new Audio("style/azirvoix.ogg");
  //  let audioP2 = new Audio("style/yasuo-hasaki.mp3");
  for(let i = 0; i < cases.length; i++) {  
    cases[i].onclick = () => {
      console.log(i);
      // Si la case cliqué est au dessus d'une case inacessible ou prise , je peux y aller sinon j'ai une alert
      if(cases[i + 7].classList.contains('prise') &&!cases[i].classList.contains('prise')) {

        if(displayCurrentPlayer.innerHTML == "Azir") {
          displayCurrentPlayer.style.color = "aqua";
        } else if (displayCurrentPlayer.innerHTML == "Yone") {
          displayCurrentPlayer.style.color = "red";
        }

        if(currentPlayer == "Azir") {
          // audio.play(); 
          cases[i].classList.add('prise');
          cases[i].classList.add('joueur-un'); 
          currentPlayer = "Yone"; 
          displayCurrentPlayer.innerHTML = currentPlayer;
        } else if(currentPlayer == "Yone") {
          // audioP2.play();
          cases[i].classList.add('prise');
          cases[i].classList.add('joueur-deux'); 
          currentPlayer = "Azir"; 
          displayCurrentPlayer.innerHTML = currentPlayer;
        }

      } else {
        alert("Les jetons ne glissent pas comme dans le vrai jeu malheureusement :/");
      }
      
      checkBoard();
    }
  }

});  

