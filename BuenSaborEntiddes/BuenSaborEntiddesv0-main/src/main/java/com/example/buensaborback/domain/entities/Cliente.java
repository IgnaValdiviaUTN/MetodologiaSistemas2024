package com.example.buensaborback.domain.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JoinColumnOrFormula;

import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Builder
public class Cliente extends Base{

    private String nombre;
    private String apellido;
    private String telefono;

    @Column(unique=true)
    private String email;

    @OneToOne
    private Usuario usuario;

    @OneToOne
    private Imagen imagen;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "cliente")
    @Builder.Default
    private Set<Pedido> pedidos = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "cliente_domicilio",
            joinColumns = {@JoinColumn(name = "cliente_id")},
            inverseJoinColumns = {@JoinColumn(name = "domicilio_id")}
    )
    @Builder.Default
    private Set<Domicilio> domicilios = new HashSet<>();

}
