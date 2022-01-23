package com.asedelivery.deliveryservice.models;

@Document(collection = "boxes")
public class Box {
    @Id
    @NotNull
    @Column(name = "id")
    private String id;

    @Id
    @NotNull
    @Column(name = "name")//name also unique
    private String name;

    @NotNull
    @Column(name = "status")//empty or contains deliveries from exactly one customer
    private String status;

    @NotNull
    @Column(name = "address")//address of the box
    private String address;

    @ManyToOne(fetch = FetchType.LAZY)
    //https://www.baeldung.com/hibernate-lazy-eager-loading
    @JoinColumn(name="USER_ID") //no sure about column name
    private UserLazy user;

    public Box(String id, String name, String address, String status, UserLazy user) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.status = status;
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStatus() { return status; }

    public void setStatus(String status) {
        this.status = status;
    }

    public UserLazy getUser() {
        return user;
    }

    public void setUser(UserLazy user) {
        this.user = user;
    }

}
