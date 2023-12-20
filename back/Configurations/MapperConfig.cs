using AutoMapper;
using Cattleision.Data;
using Cattleision.Models.AiOutputs;
using Cattleision.Models.ApiUsers;
using Cattleision.Models.Barnyards;
using Cattleision.Models.Cameras;

namespace Cattleision.Configurations
{
    public class MapperConfig:Profile
    {
        public MapperConfig()
        {
            CreateMap<UserDet, ApiUser>().ReverseMap();
            CreateMap<BaseCameraDet, Camera>().ReverseMap();
            CreateMap<CreateCameraDet, Camera>().ReverseMap();
            CreateMap<CameraDet, Camera>().ReverseMap();
            CreateMap<UpdateCameraDet, Camera>().ReverseMap();
            CreateMap<BaseBarnyardDet, Barnyard>().ReverseMap();
            CreateMap<BarnyardDet, Barnyard>().ReverseMap();
            CreateMap<BarnyardListDto, Barnyard>().ReverseMap();
            CreateMap<CreateBarnyardDet, Barnyard>().ReverseMap();
            CreateMap<UpdateBarnyardDet, Barnyard>().ReverseMap();
            CreateMap<BaseAiOutputDet, AIOutput>().ReverseMap();
        }
    }
}
