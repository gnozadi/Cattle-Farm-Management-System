namespace Cattleision.Models.Barnyards
{
    public class TotalBarnyardsDto
    {
        public List<int> TotalCowsAndBarnyards { get; set; }
        public DateOnly Today = DateOnly.FromDateTime(DateTime.Now);
    }
}
