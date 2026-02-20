using System.ComponentModel.DataAnnotations;

namespace CourierApp.Shared;

public class Vehicle
{
    [Key]
    [Required]
    [MaxLength(20)]
    public string VehicleId { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(50)]
    public string Brand { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(50)]
    public string Model { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(20)]
    public string LicensePlate { get; set; } = string.Empty;
    
    [Required]
    public int PackageCapacity { get; set; }
}