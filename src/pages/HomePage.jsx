import axios from 'axios'
import React, { useState } from 'react'

export const HomePage = () => {

    const [country, setCountry] = useState(['']);
    const [postCode, setPostCode] = useState(null);
    const [places, setPlaces] = useState(['']);
    const [postCodeInput, setPostCodeInput] = useState('');
    const [error, setError] = useState(false);
    const [errorData, setErrorData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState(false);
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
<div className='grid grid-cols-1 lg:grid-cols-2 gap-16 mt-36'>
    <section>
        <div>
            <h1 className='text-5xl font-bold'>Postal Info</h1>
            <p className='mt-4 text-gray-600 text-lg'>Descubre toda la información sobre tu código postal con Postal
                Info.
                Encuentra rápidamente detalles como el código de área, la ciudad y el estado, así como información
                demográfica.</p>
        
                <button onClick={()=>setInfo(!info)} className='font-semibold text-sm px-3 py-2 rounded-xl mt-3 bg-black text-white hover:bg-black/80 transition'>{info ? 'Ocultar' : 'Más información'}</button>
                {
                    info && <div className='mt-4 bg-yellow-300/80 rounded-lg p-6'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <p className='mt-4 text-sm'>La aplicación solo está disponible para mostrar información postal de México, sin embargo, en futuras actualizaciones se sumarán más países y funcionalidades.</p>
                </div>
                }
            
            <hr className='mt-16 w-6/12 mx-auto' />
        </div>
        <div className='w-full flex flex-col gap-3 mt-16'>
            <label className='font-semibold' htmlFor="post_code">Código Postal</label>
            <input onChange={textInput} placeholder='Tu código postal aquí: 38549' className={`w-full px-3 py-4
                bg-black/5 border-2 border-black/50 ${error || errorData ? 'border-red-900/50' : null}
                rounded-xl`} id='post_code' type="text" />
            {error && <span className='text-red-500/60 text-sm'>El campo es obligatorio</span>}
            {errorData && <span className='text-red-500/60 text-sm'>Coloca un código postal válido</span>}
            <button onClick={getData}
                className='font-bold text-white bg-black p-3 rounded-xl hover:bg-black/80 transition'
                type='submit'>Enviar</button>
        </div>
    </section>
    <section className='grid grid-cols-1 place-items-center mt-16'>
        {
        postCode && <div className='w-full grid grid-cols-1 mb-8 gap-8 border bg-gray-50 rounded-xl p-4'>
            <div>
                <h1 title='País' className='text-5xl font-bold'>{country}</h1>
                <h1 title='Código Postal' className='text-3xl'>{postCode}</h1>
            </div>
            <div className='grid grid-cols-1 gap-4'>

                {
                places.map((item, i) => {
                return(
                item &&
                <div className='text-sm flex flex-col gap-4 bg-gray-100 p-3 rounded-xl' key={i}>
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-lg font-bold'>{item.state}</h3>
                        <h3>{item['place name']}</h3>
                        <div className='mb-4 mt-6 w-full'>
                            <a 
                                className='hover:bg-gray-200 transition font-bold border p-3 rounded-xl w-full flex items-center justify-center gap-2' 
                                rel='noopener noreferrer' 
                                target={'_blank'} 
                                href={`https://www.google.com.mx/maps/@${item.latitude},${item.longitude},17z`}>Ver mapa <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-map-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"/>
                                <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
                              </svg></a>
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