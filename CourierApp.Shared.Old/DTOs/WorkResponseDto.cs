namespace CourierApp.Shared.DTOs;

public class WorkResponseDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int PackageCount { get; set; }
    public double PricePerPackage { get; set; }
    public double TotalEarned { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime? EndTime { get; set; }
    public bool IsCompleted { get; set; }
    public string? ProofImagePath { get; set; }
}