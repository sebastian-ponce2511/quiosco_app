import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria"

const Sidebar = () => {
  const { categorias } = useQuiosco()

  return (
    <>
      <Image
        className="mx-auto mt-10 h-auto"
        width={150}
        height={100}
        src="/assets/img/logo.svg"
        alt="imagen-logo"
      />

      <div className="mt-[65px]">
        {categorias.map((categoria) => (
          <Categoria key={categoria.id} categoria={categoria} />
        ))}
      </div>
    </>
  )
}

export default Sidebar
