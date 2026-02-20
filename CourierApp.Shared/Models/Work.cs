using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CourierApp.Shared;

public class Work
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    public int UserId { get; set; }
    
    [ForeignKey(nameof(UserId))]
    public User? User { get; set; }
    
    [Required]
    public int PackageCount { get; set; }
    
    [Required]
    public double PricePerPackage { get; set; }
    
    public double TotalEarned => PackageCount * PricePerPackage;
    
    public DateTime StartTime { get; set; }
    public DateTime? EndTime { get; set; }
    
    public string? ProofImagePath { get; set; }
    
    public bool IsCompleted => EndTime.HasValue;
}