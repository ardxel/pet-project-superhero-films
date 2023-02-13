import React, { useEffect, useState } from 'react';
import style from './admin.module.scss';
import axios from 'axios';
import BASE_URL from '@constants/baseUrl';

const list: Array<{ id: number; name: string }> = [
  { id: 0, name: 'Marvel' },
  { id: 1, name: 'dc' },
  { id: 2, name: 'X' },
];

const URL_ID: string = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';

const Admin = () => {
  const [InputId, setInputId] = useState<string>('');
  const [api, setApi] = useState<object>({});
  const [selectedId, setSelectedId] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const fetchApi = async (id: string) => {
    try {
      const response = await axios.get(`${URL_ID}${id}`, {
        headers: {
          'X-API-KEY': '63b5e2aa-f449-43d2-a6bf-685469059e10',
        },
      });
      const data = await response.data;
      const comic = list!.find((item) => item.id === selectedId)!.name;
      const dataWithComic = { comic, ...data };
      setApi(dataWithComic);
      console.log(dataWithComic);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchApi(InputId);
  };

  const handleSend = () => {
    if (!Object.keys(api).length) return;

    try {
      axios.post(`${BASE_URL}/save-movie`, api);
      setApi({});
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelected = (id) => {
    setSelectedId(id);
  };

  useEffect(() => {
    setError(null);
  }, [api]);

  return (
    <div className={style.container}>
      <div className={style.form}>
        <button className={style.button} onClick={handleSend}>
          Send
        </button>
        <form onSubmit={handleSubmit}>
          {list.map((item) => {
            const { id, name } = item;
            const isChecked = id === selectedId;
            return (
              <label key={id} className={style.checkbox}>
                {name}:{' '}
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleSelected(id)}
                />
              </label>
            );
          })}
          ID:
          <input
            className={style.text}
            type="text"
            placeholder="id"
            onChange={(e) => setInputId(e.target.value)}
          />
          <button className={style.button}>Enter</button>
        </form>
      </div>
      <div className={style.code}>
        <p>{error || JSON.stringify(api, null, 2)}</p>
      </div>
    </div>
  );
};

export default Admin;
