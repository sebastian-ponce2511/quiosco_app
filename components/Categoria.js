import useQuiosco from "@/hooks/useQuiosco"
import Image from "next/image"

const Categoria = ({ categoria }) => {
  const { nombre, icono, id } = categoria

  const { handleClickCategoria, categoriaActual } = useQuiosco()

  return (
    <div
      className={`${
        categoriaActual?.id === id ? "bg-amber-400" : ""
      } flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}
    >
      <Image
        className="mr-5"
        width={70}
        height={70}
        src={`/assets/img/icono_${icono}.svg`}
        alt="imagen-icono"
      />

      <button
        onClick={() => handleClickCategoria(id)}
        className="text-2xl font-bold hover:cursor-pointer"
        type="button"
      >
        {nombre}
      </button>
    </div>
  )
}

export default Categoria
