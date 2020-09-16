package com.devsuperior.dspesquisa.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

// Anotação (Notashion)
@Entity 			
/* Estou Dizendo que essa classe será mapeada para o banco de Dados
 * e que esta classe será monitorada pelo JPA, quando eu salvar um objeto
 * Genero estarei salvando uma tabela no JPA.
 */

@Table(name = "tb_genre")
/*
 * Estou dizendo que quando rodar a aplicação, irá mapear os objetos desta classe
 * na tabela "tb_genre"
 */

public class Genre implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	//Estou dizendo que este id será auto incrementado,
	//usa-se então as duas anotações acima: @Id (I maiusculo) e @GeneratedValue
	
	
	private String name;
	
	// Mapeamentos Relacionais
	// Associação dentro do Genero eu terei uma lista de games
	// para avisar para o JPA q esse games devem corresponder aos
	// games do Genero e esse nome tem q ficar igual ao que está do outro lado senão não irá funcionar
	
	@OneToMany(mappedBy = "genre")			
	List<Game> games = new ArrayList<>();
	
	public Genre () {
	}

	public Genre(Long id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
		
	public List<Game> getGames() {
		return games;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Genre other = (Genre) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
	


}
