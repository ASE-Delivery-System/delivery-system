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

    List<Delivery> findDeliveriesByDeliverer_Id(String deliverer_id);

    List<Delivery> findDeliveriesByCustomer_Id(String customer_id);

    @Query("{'deliverer' : ?0, 'status' : ?1}")
    List<Delivery> findDeliveriesByDelivererIdAndStatus(@Param("deliverer") String customer_id, @Param("status") EDeliveryStatus status);

    @Query("{'customer' : ?0, 'status' : ?1}")
    List<Delivery> findDeliveriesByCustomerIdAndStatus(@Param("customer") String customer_id, @Param("status") EDeliveryStatus status);



}
