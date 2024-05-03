package com.example.buensaborback.domain.entities;

import com.example.buensaborback.domain.entities.enums.FormaPago;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Builder
public class Factura extends Base{

    private LocalDate fechaFacturacion;
    private FormaPago formaPago;
    private Double totalVenta;

    @OneToOne
    private Pedido pedido;
}
