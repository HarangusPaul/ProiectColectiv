package com.example.app.controller;


import com.example.app.controller.request.DocumentRequest;
import com.example.app.models.DocumentDTO;
import com.example.app.service.DocumentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/app/v2/documents")
public class DocumentController {
    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping("/add")
    public ResponseEntity addDocument(@RequestBody DocumentRequest documentRequest){
        try {
            documentService.addDocument(documentRequest);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/get")
    public DocumentDTO getDocument(@RequestParam String email){
        try {
            var document = documentService.returnUserDocument(email);
            return new DocumentDTO(document.getData(),document.getDate());
        }catch (Exception e){
            return null;
        }
    }
}
