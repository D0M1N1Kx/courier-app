using System.ComponentModel.DataAnnotations;

namespace CourierApp.Shared.DTOs;

public class WorkStartDto
{
    [Required]
    public int UserId { get; set; }
    [Required]
    public int PackageCount { get; set; }
    [Required]
    public double PricePerPackage { get; set; }
}