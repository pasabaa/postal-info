import axios from 'axios'
import React, { useState } from 'react'

export const HomePage = () => {

    const [country, setCountry] = useState(['']);
    const [postCode, setPostCode] = useState(['']);
    const [places, setPlaces] = useState(['']);
    const [postCodeInput, setPostCodeInput] = useState('');
    const [error, setError] = useState(false);
    const [errorData, setErrorData] = useState(false);
    const [loading, setLoading] = useState(false);
    const API_URL = `https://api.zippopotam.us/mx/${postCodeInput}`

    const textInput = (e) => {
        setPostCodeInput(e.target.value)
        e.preventDefault();
    }

    const getData = () => {

        setLoading(true);
        setError(false);
        setErrorData(false);
        setPostCode('');

        if (postCodeInput.trim().length !== 0) {

            axios.get(API_URL)
                .then(res => setPostCode(res.data['post code']))
                .catch(error => setErrorData(error))
                .finally(() => setLoading(false))

            axios.get(API_URL)
                .then(res => setCountry(res.data.country))
                .catch(error => setErrorData(error))
                .finally(() => setLoading(false))


            axios.get(API_URL)
                .then(res => setPlaces(res.data.places))
                .catch(error => setErrorData(error))
                .finally(() => setLoading(false))

        } else {
            setError(true);
            setLoading(false)
        }

    }


return (
<div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
    <section className='mt-24'>
        <div>
            <h1 className='text-5xl font-bold'>Postal Info</h1>
            <p className='mt-4 text-gray-300 text-lg'>Descubre toda la información sobre tu código postal con Postal
                Info.
                Encuentra rápidamente detalles como el código de área, la ciudad y el estado, así como información
                demográfica.</p>
            <hr className='mt-16 border-zinc-800 w-6/12 mx-auto' />
        </div>
        <div className='w-full flex flex-col gap-3 mt-16'>
            <label className='font-semibold' htmlFor="post_code">Código Postal</label>
            <input onChange={textInput} placeholder='Tu código postal aquí: 38549' className={`w-full px-3 py-4
                bg-zinc-900/10 border-2 border-zinc-900/50 ${error || errorData ? 'border-red-900/50' : null}
                focus:outline-none rounded-xl`} id='post_code' type="text" />
            {error && <span className='text-red-500/60 text-sm'>El campo es obligatorio</span>}
            {errorData && <span className='text-red-500/60 text-sm'>Coloca un código postal válido</span>}
            <button onClick={getData}
                className='font-bold text-white bg-zinc-900/30 border-2 border-zinc-900/50 px-3 py-2 rounded-xl'
                type='submit'>Enviar</button>
        </div>
    </section>
    <section className='grid grid-cols-1 place-items-center mt-16'>
        {
        postCode && <div className='w-full grid grid-cols-1 mb-8 gap-8 border border-zinc-900/50 rounded-xl p-4'>
            <div>
                <h1 title='País' className='text-5xl font-bold'>{country}</h1>
                <h1 title='Código Postal' className='text-3xl'>{postCode}</h1>
            </div>
            <div className='grid grid-cols-2 gap-4'>

                {
                places.map((item, i) => {
                return(
                item &&
                <div className='text-sm flex flex-col gap-4 bg-zinc-900/30 p-3 rounded-xl last:col-span-2' key={i}>
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-lg font-bold'>{item.state}</h3>
                        <h3>{item['place name']}</h3>
                        <div className='mb-4 mt-6'>
                            <a className='font-bold border-2 border-zinc-900/50 px-3 py-2 rounded-xl' rel='noopener noreferrer' target={'_blank'} href={`https://www.google.com.mx/maps/@${item.latitude},${item.longitude},17z`}>Ver en el mapa</a>
                        </div>
                    </div>
                </div>
                )
                })
                }
            </div>
        </div>
        }

        {
        loading && <span className='loader'></span>
        }
    </section>
</div>
)
}