package com.asedelivery.deliveryservice.repository;

import com.asedelivery.deliveryservice.models.Delivery;
import com.asedelivery.deliveryservice.models.EDeliveryStatus;
import com.asedelivery.deliveryservice.models.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DeliveryRepository extends MongoRepository<Delivery, String> {

    Delivery findDeliveryById(String id);

    @Query("{'deliverer' : ?0}")
    List<Delivery> findDeliveriesByDeliverer_Id(@Param("deliverer") String deliverer_id);

    @Query("{'deliverer' : ?0, 'status' : ?1}")
    List<Delivery> findOutForDeliveryDeliveriesOfDeliverer(@Param("deliverer") String deliverer_id, @Param("status") EDeliveryStatus status);

    @Query("{'customer' : ?0, 'status' : ?1}")
    List<Delivery> findDeliveredDeliveriesOfCustomer(@Param("customer") String customer_id, @Param("status") EDeliveryStatus status);

    @Query("{'customer' : ?0, 'status' : { $ne: ?1 }}")
    List<Delivery> findAllActiveDeliveries(@Param("customer") String customer_id, @Param("status") EDeliveryStatus status);

    @Query("{'customer' : ?0, 'status' : ?1 }")
    List<Delivery> findAllPastDeliveries(@Param("customer") String customer_id, @Param("status") EDeliveryStatus status);

}
