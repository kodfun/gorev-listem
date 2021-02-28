import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css'

// React Bileşeni (Component)
function Gorev({ gorev, indeks, gorevTamamla, gorevSil }) {
  return (
    <div className="todo" style={{ textDecoration: gorev.yapildi ? "line-through" : "" }}>
      { gorev.metin }
      <div>
        <button onClick={() => gorevTamamla(indeks)}>Tamamla</button>
        <button onClick={() => gorevSil(indeks)}>X</button>
      </div>
    </div>
  );
}

// React Bileşeni (Component)
function YeniGorevForm({ gorevEkle }) {
  const [metin, metniGuncelle] = useState("");

  const formTeslim = e => {
    e.preventDefault();
    if(!metin)return;
    gorevEkle(metin);
    metniGuncelle("");
  };

  return (
    <form onSubmit={formTeslim}>
      <input 
        type="text" 
        placeholder="Yeni görev.."
        className="input"
        value={metin} 
        onChange={e => metniGuncelle(e.target.value)}
      />
    </form>
  );
}

// React Bileşeni (Component)
function App() {
  const [gorevler, gorevleriGuncelle] = useState([
    { metin: "React Öğren!", yapildi: false },
    { metin: "Bulaşıkları yıka", yapildi: false },
    { metin: "Kitap oku", yapildi: false }
  ]);

  const gorevEkleHandler = deger => {
    const yeniGorevler = [...gorevler, { metin: deger } ];
    gorevleriGuncelle(yeniGorevler);
  }

  const gorevTamamlaHandler = indeks => {
    const yeniGorevler = [...gorevler];
    yeniGorevler[indeks].yapildi = true;
    gorevleriGuncelle(yeniGorevler);
  };

  const gorevSilHandler = indeks => {
    const yeniGorevler = [...gorevler];
    yeniGorevler.splice(indeks, 1);
    gorevleriGuncelle(yeniGorevler);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {
          gorevler.map((gorev, indeks) => (
            <Gorev 
              key={indeks} 
              indeks={indeks} 
              gorev={gorev} 
              gorevTamamla={gorevTamamlaHandler}
              gorevSil={gorevSilHandler} />
          ))
        }
        <YeniGorevForm gorevEkle={gorevEkleHandler} />
      </div>
    </div>
  );
}

export default App;