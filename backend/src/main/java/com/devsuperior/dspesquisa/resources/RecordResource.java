/*
 * CLASSE QUE IMPLEMENTA O RECURSO RECORDS
 * TUDO QUE PRECISAR DE OPERAÇÕES RELACIONADAS A GAMES
 * SERÁ FEITA POR ESSE CONTROLADOR
 * 
 * CONTROLADOR REST
 * QUE SERÁ UM WEB SERVICE, QUE IRÁ RESPONDER AS REQUISIÇÕES
 */

package com.devsuperior.dspesquisa.resources;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dspesquisa.dto.RecordDTO;
import com.devsuperior.dspesquisa.dto.RecordInsertDTO;
import com.devsuperior.dspesquisa.services.RecordService;

@RestController
@RequestMapping(value = "/records")	// Define a rota principal do Recurso

public class RecordResource {

		// Vai um pré processamento para entregar uma instância automaticamente
		// é uma injeção de dependencia
		// é necessário fazer uma anotação @Repository no repositório referente
		// EndPoint -> Rota que o webService irá utilizar
		// @Autowired
		// private GameRepository gameRepository;
		
		// Implementação para testar se a Rota está funcionando
		// método deve ser Public!!! PUBLIC!!!
	
	@Autowired
	private RecordService service;
	
	@PostMapping			//Requisição POST (ENVIO)
	public ResponseEntity<RecordDTO> insert(@RequestBody RecordInsertDTO dto) {
		//@RequestBody = Corpo da Requisição
		RecordDTO newDTO = service.insert(dto);
		return ResponseEntity.ok().body(newDTO);
	}
	
	@GetMapping
	public ResponseEntity<Page<RecordDTO>> findAll(
			@RequestParam(value = "min", defaultValue = "") String min,
			@RequestParam(value = "max", defaultValue = "") String max,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "0") Integer linesPerPage,
			@RequestParam(value = "orderBy", defaultValue = "moment") String orderBy,
			@RequestParam(value = "direction", defaultValue = "DESC") String direction) {
		
		// Se o resultado que vier for vazio, inicia as variaves com valor nulo, caso contrário faz o parse
		Instant minDate = ("".equals(min)) ? null : Instant.parse(min);
		Instant maxDate = ("".equals(max)) ? null : Instant.parse(max);
		
		if (linesPerPage == 0) {
			linesPerPage = Integer.MAX_VALUE;
		}
	
		// Configurando um objeto de paginação
		// Objeto do tipo PageRequest
		// Direction.valueOf(direction) -> converte de string para tipo enumerado
		// as variaves na PageRequest.of correspondem as variáveis informadas na atribuição do método ResponseEntity
		
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		
		Page<RecordDTO> list = service.findByMoments(minDate, maxDate, pageRequest);
		return ResponseEntity.ok().body(list);
		
	}
}
