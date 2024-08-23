import './header.css'
import { SneakerMove } from "@phosphor-icons/react"

export default function Header(){
    return(
        <>
        <header>
            <div className="logo-nunes"> 
            <div className="texto-principal">
            <SneakerMove size={32} weight="fill" aria-label="símbolo de tênis representando movimento"/>
            <p>Nunes Sports</p>
            </div>
            <div className="subtexto">
                <p> portal do administrador </p>
            </div>
            </div>
        </header>
        </>
    );

}