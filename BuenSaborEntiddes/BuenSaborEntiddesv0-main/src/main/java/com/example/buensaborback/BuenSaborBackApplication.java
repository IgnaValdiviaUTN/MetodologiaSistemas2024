package com.example.buensaborback;

import com.example.buensaborback.domain.entities.*;
import com.example.buensaborback.domain.entities.enums.Estado;
import com.example.buensaborback.domain.entities.enums.FormaPago;
import com.example.buensaborback.domain.entities.enums.TipoEnvio;
import com.example.buensaborback.domain.entities.enums.TipoPromocion;
import com.example.buensaborback.repositories.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;

@SpringBootApplication
public class BuenSaborBackApplication {

	private static final Logger logger = LoggerFactory.getLogger(BuenSaborBackApplication.class);

	@Autowired
	private ClienteRepository clienteRepository;

	@Autowired
	private PaisRepository paisRepository;

	@Autowired
	private ProvinciaRepository provinciaRepository;

	@Autowired
	private LocalidadRepository localidadRepository;

	@Autowired
	private EmpresaRepository empresaRepository;

	@Autowired
	private SucursalRepository	sucursalRepository;

	@Autowired
	private DomicilioRepository domicilioRepository;

	@Autowired
	private UnidadMedidaRepository unidadMedidaRepository;

	@Autowired
	private CategoriaRepository categoriaRepository;

	@Autowired
	private ArticuloInsumoRepository articuloInsumoRepository;

	@Autowired
	private ArticuloManufacturadoRepository articuloManufacturadoRepository;

	@Autowired
	private ImagenRepository imagenRepository;

	@Autowired
	private PromocionRepository promocionRepository;

	@Autowired
	private PedidoRepository pedidoRepository;

	@Autowired
	private UsuarioRepository usuarioRepository;

    @Autowired
    private FacturaRepository facturaRepository;

	public static void main(String[] args) {
		SpringApplication.run(BuenSaborBackApplication.class, args);
		logger.info("Estoy activo en el main");
	}


	@Bean
	CommandLineRunner init() {
		return args -> {
			logger.info("----------------ESTOY----FUNCIONANDO---------------------");
			// Etapa del dashboard
			// Crear 1 pais
			// Crear 2 provincias para ese pais
			// crear 2 localidades para cada provincia
			Pais pais1 = Pais.builder().nombre("Brazilasao").build();
			Provincia provincia1 = Provincia.builder().nombre("Mendozao").pais(pais1).build();
			Provincia provincia2 = Provincia.builder().nombre("Cordobao").pais(pais1).build();
			Localidad localidad1 = Localidad.builder().nombre("Lujan de Cuyao").provincia(provincia1).build();
			Localidad localidad2 = Localidad.builder().nombre("Godinho Cruzao").provincia(provincia1).build();
			Localidad localidad3 = Localidad.builder().nombre("Achirasinho").provincia(provincia2).build();
			Localidad localidad4 = Localidad.builder().nombre("Agua de Orao").provincia(provincia2).build();

			paisRepository.save(pais1);
			provinciaRepository.save(provincia1);
			provinciaRepository.save(provincia2);
			localidadRepository.save(localidad1);
			localidadRepository.save(localidad2);
			localidadRepository.save(localidad3);
			localidadRepository.save(localidad4);

			// Crear 1 empresa
			// Crear 2 sucursales para esa empresa
			// crear los Domicilios para esas sucursales
			Empresa empresaBrown = Empresa.builder().nombre("Lo de Brown").cuil(30503167).razonSocial("Venta de Alimentos").build();


			Sucursal sucursalChacras = Sucursal.builder().nombre("En chacras").horarioApertura(LocalTime.of(17,0)).horarioCierre(LocalTime.of(23,0)).build();
			Sucursal sucursalGodoyCruz = Sucursal.builder().nombre("En godoy cruz").horarioApertura(LocalTime.of(16,0)).horarioCierre(LocalTime.of(23,30)).build();
			Domicilio domicilioViamonte = Domicilio.builder().cp(5509).calle("Viamonte").numero(500).piso(2).nroDpto(23).localidad(localidad1).build();
			Domicilio domicilioSanMartin = Domicilio.builder().cp(5511).calle("San Martin").numero(789).localidad(localidad2).build();
			empresaRepository.save(empresaBrown);
			sucursalChacras.setDomicilio(domicilioViamonte);
			sucursalChacras.setEmpresa(empresaBrown);
			sucursalGodoyCruz.setDomicilio(domicilioSanMartin);
			sucursalGodoyCruz.setEmpresa(empresaBrown);
			empresaBrown.getSucursales().add(sucursalChacras);
			empresaBrown.getSucursales().add(sucursalGodoyCruz);
			domicilioRepository.save(domicilioViamonte);
			domicilioRepository.save(domicilioSanMartin);

			sucursalRepository.save(sucursalChacras);
			sucursalRepository.save(sucursalGodoyCruz);





			// Crear Unidades de medida
			UnidadMedida unidadMedidaLitros = UnidadMedida.builder().denominacion("Litros").build();
			UnidadMedida unidadMedidaGramos = UnidadMedida.builder().denominacion("Gramos").build();
			UnidadMedida unidadMedidaCantidad = UnidadMedida.builder().denominacion("Cantidad").build();
			UnidadMedida unidadMedidaPorciones = UnidadMedida.builder().denominacion("Porciones").build();
			unidadMedidaRepository.save(unidadMedidaLitros);
			unidadMedidaRepository.save(unidadMedidaGramos);
			unidadMedidaRepository.save(unidadMedidaCantidad);
			unidadMedidaRepository.save(unidadMedidaPorciones);

			// Crear Categorías de productos y subCategorías de los mismos
			Categoria categoriaBebidas = Categoria.builder().denominacion("Bebidas").build();
			categoriaRepository.save(categoriaBebidas);
			Categoria categoriaGaseosas = Categoria.builder().denominacion("Gaseosas").categoriaPadre(categoriaBebidas).build();
			categoriaRepository.save(categoriaGaseosas);
			Categoria categoriaTragos = Categoria.builder().denominacion("Tragos").categoriaPadre(categoriaBebidas).build();
			categoriaRepository.save(categoriaTragos);
			Categoria categoriaPizzas = Categoria.builder().denominacion("Pizzas").build();
			categoriaRepository.save(categoriaPizzas);
			categoriaBebidas.getSubCategorias().add(categoriaGaseosas);
			categoriaBebidas.getSubCategorias().add(categoriaTragos);
			categoriaRepository.save(categoriaBebidas);


			// Crear Insumos , coca cola , harina , etc
			ArticuloInsumo cocaCola = ArticuloInsumo.builder().denominacion("Coca cola").unidadMedida(unidadMedidaLitros).esParaElaborar(false).stockActual(5).stockMaximo(50).precioCompra(50.0).precioVenta(70.0).categoria(categoriaBebidas).build();
			ArticuloInsumo harina = ArticuloInsumo.builder().denominacion("Harina").unidadMedida(unidadMedidaGramos).esParaElaborar(true).stockActual(4).stockMaximo(40).precioCompra(40.0).precioVenta(60.5).build();
			ArticuloInsumo queso = ArticuloInsumo.builder().denominacion("Queso").unidadMedida(unidadMedidaGramos).esParaElaborar(true).stockActual(20).stockMaximo(50).precioCompra(23.6).precioVenta(66.6).build();
			ArticuloInsumo tomate = ArticuloInsumo.builder().denominacion("Tomate").unidadMedida(unidadMedidaCantidad).esParaElaborar(true).stockActual(20).stockMaximo(50).precioCompra(23.6).precioVenta(66.6).build();

			// crear fotos para cada insumo
			Imagen imagenCoca = Imagen.builder().url("https://m.media-amazon.com/images/I/51v8nyxSOYL._SL1500_.jpg").articulo(cocaCola).build();
			Imagen imagenHarina = Imagen.builder().url("https://mandolina.co/wp-content/uploads/2023/03/648366622-1024x683.jpg").articulo(harina).build();
			Imagen imagenQueso = Imagen.builder().url("https://superdepaso.com.ar/wp-content/uploads/2021/06/SANTAROSA-PATEGRAS-04.jpg").articulo(queso).build();
			Imagen imagenTomate = Imagen.builder().url("https://thefoodtech.com/wp-content/uploads/2020/06/Componentes-de-calidad-en-el-tomate-828x548.jpg").articulo(tomate).build();

            articuloInsumoRepository.save(cocaCola);
            articuloInsumoRepository.save(harina);
            articuloInsumoRepository.save(queso);
            articuloInsumoRepository.save(tomate);

            cocaCola.getImagenes().add(imagenCoca);
            harina.getImagenes().add(imagenHarina);
            queso.getImagenes().add(imagenQueso);
            tomate.getImagenes().add(imagenTomate);

            imagenRepository.save(imagenCoca);
            imagenRepository.save(imagenHarina);
            imagenRepository.save(imagenQueso);
            imagenRepository.save(imagenTomate);

			// Crear Articulos Manufacturados
			ArticuloManufacturado pizzaMuzarella = ArticuloManufacturado.builder().denominacion("Pizza Muzarella").descripcion("Una pizza clasica").unidadMedida(unidadMedidaPorciones).precioVenta(130.0).tiempoEstimadoMinutos(15).preparacion("Pasos de preparacion de una muzza de toda la vida").categoria(categoriaPizzas).build();
			ArticuloManufacturado pizzaNapolitana = ArticuloManufacturado.builder().denominacion("Pizza Muzarella").descripcion("Una pizza clasica").unidadMedida(unidadMedidaPorciones).precioVenta(150.0).tiempoEstimadoMinutos(15).preparacion("Pasos de preparacion de una pizza napolitana italiana").categoria(categoriaPizzas).build();

			// Crear fotos para los artículos manufacturados
			Imagen imagenPizzaMuzarella = Imagen.builder().url("https://storage.googleapis.com/fitia-api-bucket/media/images/recipe_images/1002846.jpg").articulo(pizzaMuzarella).build();
			Imagen imagenPizzaNapolitana = Imagen.builder().url("https://assets.elgourmet.com/wp-content/uploads/2023/03/8metlvp345_portada-pizza-1024x686.jpg.webp").articulo(pizzaNapolitana).build();
			articuloManufacturadoRepository.save(pizzaMuzarella);
			articuloManufacturadoRepository.save(pizzaNapolitana);
            imagenRepository.save(imagenPizzaMuzarella);
            imagenRepository.save(imagenPizzaNapolitana);

			// Establecer las relaciones entre estos objetos.
			ArticuloManufacturadoDetalle detalle1 = ArticuloManufacturadoDetalle.builder().articuloInsumo(harina).articuloManufacturado(pizzaMuzarella).cantidad(300).build();
			ArticuloManufacturadoDetalle detalle2 = ArticuloManufacturadoDetalle.builder().articuloInsumo(queso).articuloManufacturado(pizzaMuzarella).cantidad(600).build();
			ArticuloManufacturadoDetalle detalle3 = ArticuloManufacturadoDetalle.builder().articuloInsumo(harina).articuloManufacturado(pizzaNapolitana).cantidad(350).build();
			ArticuloManufacturadoDetalle detalle4 = ArticuloManufacturadoDetalle.builder().articuloInsumo(queso).articuloManufacturado(pizzaNapolitana).cantidad(650).build();
			ArticuloManufacturadoDetalle detalle5 = ArticuloManufacturadoDetalle.builder().articuloInsumo(tomate).articuloManufacturado(pizzaNapolitana).cantidad(2).build();

			pizzaMuzarella.getArticuloManufacturadoDetalles().add(detalle1);
			pizzaMuzarella.getArticuloManufacturadoDetalles().add(detalle2);
			pizzaNapolitana.getArticuloManufacturadoDetalles().add(detalle3);
			pizzaNapolitana.getArticuloManufacturadoDetalles().add(detalle4);
			pizzaNapolitana.getArticuloManufacturadoDetalles().add(detalle5);
			articuloManufacturadoRepository.save(pizzaMuzarella);
			articuloManufacturadoRepository.save(pizzaNapolitana);

			// Establecer relaciones de las categorias
			categoriaGaseosas.getArticulos().add(cocaCola);
			categoriaPizzas.getArticulos().add(pizzaMuzarella);
			categoriaPizzas.getArticulos().add(pizzaNapolitana);
			categoriaRepository.save(categoriaGaseosas);
			categoriaRepository.save(categoriaPizzas);

			// Crear promocion para sucursal - Dia de los enamorados
			// Tener en cuenta que esa promocion es exclusivamente para una sucursal determinada d euna empresa determinada
			Promocion promocionDiaEnamorados = Promocion.builder().denominacion("Dia de los Enamorados")
					.fechaDesde(LocalDate.of(2024,2,13))
					.fechaHasta(LocalDate.of(2024,2,15))
					.horaDesde(LocalTime.of(0,0))
					.horaHasta(LocalTime.of(23,59))
					.descripcionDescuento("El descuento que se hace por san valentin, un dia antes y un dia despues")
					.precioPromocional(100.0)
					.tipoPromocion(TipoPromocion.promocion)
					.build();
			promocionDiaEnamorados.getArticulos().add(cocaCola);
			promocionDiaEnamorados.getArticulos().add(pizzaNapolitana);
			promocionRepository.save(promocionDiaEnamorados);

            //Crear una imagen para promocion
            Imagen imagenPromocionEnamorados = Imagen.builder().url("https://imgs.search.brave.com/l5ghkrUC13EzRCT1auORGqNJ4np5L-UOvKb_fOMKvH0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuZGV2LWZpbG8u/ZGlmdC5pby9pbWcv/MjAyMy8wMi8xMy91/bm5hbWVkNDEpXygx/KTgwMjVfc3EuanBn").promocion(promocionDiaEnamorados).build();
            promocionDiaEnamorados.getImagenes().add(imagenPromocionEnamorados);
            imagenRepository.save(imagenPromocionEnamorados);
			//Agregar categorias y promociones a sucursales
			sucursalChacras.getCategorias().add(categoriaBebidas);
			sucursalChacras.getCategorias().add(categoriaPizzas);
			sucursalChacras.getPromociones().add(promocionDiaEnamorados);

			sucursalGodoyCruz.getCategorias().add(categoriaBebidas);
			sucursalGodoyCruz.getCategorias().add(categoriaPizzas);

			sucursalRepository.save(sucursalChacras);
			sucursalRepository.save(sucursalGodoyCruz);





			//Crea un cliente y un usuario
			Imagen imagenCliente = Imagen.builder().url("https://hips.hearstapps.com/hmg-prod/images/la-la-land-final-1638446140.jpg").build();
			imagenRepository.save(imagenCliente);
			Usuario usuario = Usuario.builder().username("sebastian").auth0Id("9565a49d-ecc1-4f4e-adea-6cdcb7edc4a3").build();
			usuarioRepository.save(usuario);
			Cliente cliente = Cliente.builder().usuario(usuario)
					.imagen(imagenCliente)
					.email("correoFalso@gmail.com")
					.nombre("Sebastian")
					.apellido("Wilder")
					.telefono("2615920825")
					.build();
			cliente.getDomicilios().add(domicilioViamonte);
			clienteRepository.save(cliente);

			//Crear un Factura

			//Crea un pedido para el cliente
			Pedido pedido = Pedido.builder().fechaPedido(LocalDate.now())
							.horaEstimadaFinalizacion(LocalTime.now())
							.total(300.0)
							.totalCosto(170.6)
					.estado(Estado.Preparacion)
					.formaPago(FormaPago.MercadoPago)
					.tipoEnvio(TipoEnvio.Delivery)
					.sucursal(sucursalChacras)
                    .cliente(cliente)
					.domicilio(domicilioViamonte).build();

			DetallePedido detallePedido1 = DetallePedido.builder().articulo(pizzaMuzarella).cantidad(1).subTotal(200.0).pedido(pedido).build();
			DetallePedido detallePedido2 = DetallePedido.builder().articulo(cocaCola).cantidad(2).subTotal(100.0).pedido(pedido).build();

			pedido.getDetallePedidos().add(detallePedido1);
			pedido.getDetallePedidos().add(detallePedido2);
			pedidoRepository.save(pedido);

			Factura factura = Factura.builder().fechaFacturacion(LocalDate.now()).formaPago(FormaPago.Efectivo).totalVenta(50000.2).pedido(pedido).build();
			facturaRepository.save(factura);
			cliente.getPedidos().add(pedido);
			clienteRepository.save(cliente);

		};
	}
}



