import { useEffect, useState } from 'react';
import './xoxgame.css';

function XoxGameComponent() {
  const [games, setGames] = useState([]); //OYUN HAMLELERİ
  const [mark, setMark] = useState('X');  //KARAKTERLER
  const [message, setMessage] = useState(''); //KAZANMA BERABERE MESAJLARI
  const [isGameFinish, setIsGameFinish] = useState(false) //SIFIRLAMA İÇİN
  const [gameMove, setGameMove] = useState([]) //OYUNDA HAREKETLERE GERİ DÖNME

  //OYUNU BAŞLATMA
  const newGame = () => {   // Başlangıçta Oyun hamleleri
    setGames([  //Bütün kutucuklar boş
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ]);
    setIsGameFinish(false);
    setMark('X');
    setMessage('Hamle Sırası: ' + mark);
    setGameMove([])
  }

  //HAMLE YAPMA
  const markGame = (index) => { //Hamle kayıt etme
    if (!isGameFinish) {   //Eğer oyun bitmemişse
      const newGames = [...games];  //games' i atıyoruz boş kutucuklar için
      if (newGames[index] == "") {   //bastığımız index yani kutu boş ise 
        newGames[index] = mark;
        setGames(newGames);  //bir üstde belirlediğimiz değeri setgames içinde hamleye yazıyoruz
        setGameMove((val) => [...val, newGames])
        let r = isGameOVer(newGames)  //KAZANAN BELİRLEME
        if (r) {
          setMessage('Oyunu ' + mark + ' Kazandı');  //mesajı ver
          setIsGameFinish(true);
          return;  //Burada sonlandır

        }
        let e = isMoveFinish(newGames)
        if (e) {  //berabere kontrolü
          setMessage('BERABERE');  //mesajı ver
          setIsGameFinish(true);
          return;  //Burada sonlandır

        }
        mark == 'X' ? setMark('O') : setMark('X');   //X ise O ; O ise X
        setMessage('Hamle Sırası: ' + (mark == 'X' ? 'O' : 'X'));  //message değiştirme
      }
    }
  }

  ///İSTENİLEN HAMLEYE GİTME
  const ThatGameMovie = (gamemove) => {
    setGames(gamemove);
  }

  //KAZANAN BELİRLEME
  const isGameOVer = (newGames) => {
    if (newGames[0] !== ""
      && newGames[0] === newGames[1]
      && newGames[1] === newGames[2]) {
      return true;
    }
    if (newGames[3] !== ""
      && newGames[3] === newGames[4]
      && newGames[4] === newGames[5]) {
      return true;
    }
    if (newGames[6] !== ""
      && newGames[6] === newGames[7]
      && newGames[7] === newGames[8]) {
      return true;
    }
    if (newGames[0] !== ""
      && newGames[0] === newGames[3]
      && newGames[3] === newGames[6]) {
      return true;
    }
    if (newGames[1] !== ""
      && newGames[1] === newGames[4]
      && newGames[4] === newGames[7]) {
      return true;
    }
    if (newGames[2] !== ""
      && newGames[2] === newGames[5]
      && newGames[5] === newGames[8]) {
      return true;
    }
    if (newGames[0] !== ""
      && newGames[0] === newGames[4]
      && newGames[4] === newGames[8]) {
      return true;
    }
    if (newGames[2] !== ""
      && newGames[2] === newGames[4]
      && newGames[4] === newGames[6]) {
      return true;
    }
    return false;

  }

  //BERABERE BELİRLEME
  const isMoveFinish = (newGames) => {  //Oyun bittimi kontrolü boş alan kalmaması kontrolü
    for (let i = 0; i < newGames.length; i++) {
      const element = newGames[i];
      if (element === "") {
        return false;
      }
    }
    return true;
  }


  //BUDA YENİLEMEİÇİN
  useEffect(() => {
    newGame();
  }, [])
  return (
    <>
      <div className="container text-center">
        <h1>XOX OYUNU</h1>
        <h2 className='alert alert-warning'>{message}</h2>
        <button className='btn btn-outline-primary w-100' onClick={newGame}> Yeni Oyun</button>  
        <div className="row mt-4">
          {/* Oyun tahtasında adımları oluşturma */}
          {games.map((game, index) => (
            <div key={index}
              onClick={() => markGame(index)}
              className='col-md-4 box'>{game}
            </div>
          ))}
        </div>
        <hr />
        {gameMove.map((gamemove, index) => (
          <button key={index}
            className='btn btn-primary mx-2 mt-2' onClick={() => ThatGameMovie(gamemove)}>{index + 1}.hamle
          </button>
        ))}
      </div>

    </>
  );
}

export default XoxGameComponent;
