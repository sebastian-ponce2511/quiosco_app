import { useState, useEffect, createContext } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { toast } from "react-toastify"

const QuioscoContext = createContext()

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([])
  const [categoriaActual, setCategoriaActual] = useState({})
  const [producto, setProducto] = useState({})
  const [modal, setModal] = useState(false)
  const [pedido, setPedido] = useState([])
  const [paso, setPaso] = useState(1)
  const [nombre, setNombre] = useState("")
  const [total, setTotal] = useState(0)

  const router = useRouter()

  const obtenerCategorias = async () => {
    const { data } = await axios("/api/categorias")
    setCategorias(data)
  }

  useEffect(() => {
    const nuevoTotal = pedido.reduce(
      (total, producto) => producto.cantidad * producto.precio + total,
      0
    )

    setTotal(nuevoTotal)
  }, [pedido])

  useEffect(() => {
    obtenerCategorias()
  }, [])

  useEffect(() => {
    setCategoriaActual(categorias[0])
  }, [categorias])

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((cat) => cat.id === id)
    setCategoriaActual(categoria[0])
    router.push("/")
  }

  const handleAgregarPedido = (producto) => {
    if (pedido.some((prodState) => prodState.id === producto.id)) {
      //Actualizar la cantidad si el producto ya existe
      const pedidoActualizado = pedido.map((prodState) =>
        prodState.id === producto.id ? producto : prodState
      )
      setPedido(pedidoActualizado)
    } else {
      setPedido([...pedido, producto])
    }
    setModal(false)
    toast.success("Agregado al pedido", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
  }

  const colocarOrden = async (e) => {
    e.preventDefault()
    try {
      await axios.post("/api/ordenes", {
        pedido,
        nombre,
        total,
        fecha: Date.now().toString(),
      })

      // Se resetea la app luego de que se manda el pedido a la DB
      setCategoriaActual(categorias[0])
      setPedido([])
      setNombre("")
      setTotal(0)

      toast.success("Pedido agregado correctamente", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })

      setTimeout(() => {
        router.push("/")
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        setCategorias,
        categoriaActual,
        setCategoriaActual,
        handleClickCategoria,
        handleAgregarPedido,
        producto,
        setProducto,
        modal,
        setModal,
        pedido,
        setPedido,
        paso,
        setPaso,
        colocarOrden,
        total,
        nombre,
        setNombre,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  )
}

export { QuioscoProvider }

export default QuioscoContext
