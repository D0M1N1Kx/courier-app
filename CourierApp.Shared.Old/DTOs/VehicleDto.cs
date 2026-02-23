using System.ComponentModel.DataAnnotations;

namespace CourierApp.Shared.DTOs;

public class VehicleDto
{
    [Required]
    public string VehicleId { get; set; } = string.Empty;
    
    [Required]
    public string Brand { get; set; } = string.Empty;
    
    [Required]
    public string Model { get; set; } = string.Empty;
    
    [Required]
    public string LicensePlate { get; set; } = string.Empty;
    
    [Required]
    public int PackageCapacity { get; set; }
}