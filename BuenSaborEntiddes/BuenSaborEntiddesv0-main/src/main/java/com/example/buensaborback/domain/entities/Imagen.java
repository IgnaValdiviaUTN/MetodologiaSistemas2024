package com.example.buensaborback.domain.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Entity
public class Imagen extends Base{

    private String url;

    @ManyToOne
    @JoinColumn(name = "articulo_id")
    private Articulo articulo;


    @ManyToOne
    @JoinColumn(name = "promocion_id")
    private Promocion promocion;
}
