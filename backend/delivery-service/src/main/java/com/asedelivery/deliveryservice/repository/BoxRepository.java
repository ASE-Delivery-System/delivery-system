package com.asedelivery.deliveryservice.repository;

import org.springframework.data.map.repository.config.EnableMapRepositories;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@EnableMapRepositories
public class BoxService {
    private final CrudRepository<Box, Long> repository;

    public BoxService(CrudRepository<Box, Long> repository) {
        this.repository = repository;
        this.repository.saveAll(demoBoxes());
    }

    private static List<Box> demoBoxes() {
        return List.of(
                new Box("1001", "A1", "empty", "Str. 3 Munich", "user001"),
                new Box("1111", "A2", "taken", "Str.4 Munich", "user002"),
                new Box("1010", "B2", "taken", "Str. 5 Munich", "user001"),
                new Box("1011", "B1", "empty", "Str. 6 Munich", "")
        );
    }

    public List<Box> findAll() {
        List<Box> list = new ArrayList<>();
        Iterable<Box> boxes = repository.findAll();
        boxes.forEach(list::add);
        return list;
    }

    public Optional<Box> find(String id) {
        return repository.findById(id);
    }

    public Box create(Box box) {

        Box newbox = new Box(
                box.getId(),
                box.getName(),
                box.getStatus(),
                box.getAddress(),
                box.getUser(),

        );
        return repository.save(copy);
    }

    public Optional<Box> update(String id, Box newBox) {
        return repository.findById(id)
                .map(oldBox -> {
                    Box updated = oldBox.updateWith(newBox);
                    return repository.save(updated);
                });
    }

    public void delete(String id) {
        repository.deleteById(id);
    }
}