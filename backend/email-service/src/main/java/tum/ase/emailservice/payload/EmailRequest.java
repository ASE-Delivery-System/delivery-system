package tum.ase.emailservice.payload;


import javax.validation.constraints.NotBlank;

public class EmailRequest {
    @NotBlank
    private String to;
    @NotBlank
    private String Status;

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }
}
