/*
 * CLASSE QUE IMPLEMENTA O RECURSO DE GAMES
 * TUDO QUE PRECISAR DE OPERAÇÕES RELACIONADAS A GAMES
 * SERÁ FEITA POR ESSE CONTROLADOR
 * 
 * CONTROLADOR REST
 * QUE SERÁ UM WEB SERVICE, QUE IRÁ RESPONDER AS REQUISIÇÕES
 */

package com.devsuperior.dspesquisa.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dspesquisa.dto.GameDTO;
import com.devsuperior.dspesquisa.services.GameService;

@RestController
@RequestMapping(value = "/games")	// Define a rota principal do Recurso

public class GameResource {

		// vai um pré processamento para entregar uma instância automaticamente
		// é uma injeção de dependencia
		// é necessário fazer uma anotação @Repository no repositório referente
		// EndPoint -> Rota que o webService irá utilizar
		// @Autowired
		// private GameRepository gameRepository;
		
		// Implementação para testar se a Rota está funcionando
		// método deve ser Public!!! PUBLIC!!!
	
	@Autowired
	private GameService service;
	
	@GetMapping		//Requisição GET
	public ResponseEntity<List<GameDTO>> findAll() {
		List<GameDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
				
	}
}
