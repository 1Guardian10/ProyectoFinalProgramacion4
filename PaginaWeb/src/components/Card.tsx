import React from 'react';
import { MyComponentProps } from '../Interface/types';
import { useNavigate } from 'react-router-dom';

const Card: React.FC<MyComponentProps> = ({ item, imageBaseUrl, showOverview, containerClass, aspectRatioClass, page }) => {
    const nav=useNavigate();
  return (
    <div className={`${containerClass}`}>
        <div className={`group relative overflow-hidden rounded-lg ${aspectRatioClass}`}>
            {item.img ? (
            <img
                src={item.img.startsWith("http") ? item.img : `${imageBaseUrl}${item.img}`}
                alt={item.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
                <span className="text-muted-foreground">Sin imagen</span>
            </div>
            )}

            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-black/70 opacity-0 transition-opacity group-hover:opacity-100"></div>

            {/* Título e info */}
            <div className="absolute bottom-0 w-full p-3 text-white z-10">
            <h3 className="font-bold truncate transition-opacity group-hover:opacity-0">
                {item.title}
            </h3>

            {item.rating && (
                <div className="mt-1 text-xs opacity-0 transition-opacity group-hover:opacity-0">
                ★ {item.rating.toFixed(1)}
                </div>
            )}
            </div>

            {/* Descripción */}
            {showOverview && item.summary && (
                <div className="absolute inset-0 flex flex-col p-4 opacity-0 transition-opacity group-hover:opacity-100 z-10 text-white">
                    
                    {/* Título arriba */}
                    <h3 className="font-bold mb-2">{item.title}</h3>

                    {/* Contenedor scrollable solo para la descripción */}
                    <div className="flex-1 overflow-y-auto text-sm">
                    <p>{item.summary}</p>
                    </div>

                    {/* Fecha y rating fijos abajo */}
                    <div className="mt-2 text-xs">
                        {item.release_date && <div>{item.release_date}</div>}
                        {item.rating && <div>★ {item.rating.toFixed(1)}</div>}
                        <button className='text-black rounded-2xl bg-white hover:bg-gray-500 p-1'
                        onClick={()=>{
                            nav(`/${page}/${item.id}`)
                        }}
                        >Mas detalles</button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default Card;
