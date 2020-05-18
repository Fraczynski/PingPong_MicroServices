using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using HomePageService.Data;
using HomePageService.Dtos;
using HomePageService.Helpers;
using HomePageService.Models;

namespace TableReservationApplication.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Employee")]
    public class PhotosController : ControllerBase
    {
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private readonly Cloudinary _cloudinary;
        private readonly IMapper _mapper;
        private readonly IPhotosRepository _repo;

        public PhotosController(IOptions<CloudinarySettings> cloudinaryConfig, IMapper mapper, IPhotosRepository repo)
        {
            _repo = repo;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;
            Account acc = new Account(
                _cloudinaryConfig.Value.CloundName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(acc);
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetPhotos()
        {
            var photos = await _repo.GetPhotos();
            return Ok(_mapper.Map<IEnumerable<PhotoForReturnDto>>(photos));
        }
        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photo = await _repo.GetPhoto(id);
            if (photo == null)
            {
                return NotFound($"Zdjęcie numerze id: {id} już nie istnieje");
            }
            var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
            return Ok(photoToReturn);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhoto([FromForm]PhotoForCreationDto photoForCreationDto)
        {
            var file = photoForCreationDto.File;
            var uploudResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploudParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(700).Height(400).Crop("fill")
                    };
                    uploudResult = _cloudinary.Upload(uploudParams);
                }
            }
            photoForCreationDto.Url = uploudResult.Uri.ToString();
            photoForCreationDto.PublicId = uploudResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);
            _repo.AddPhoto(photo);
            if (await _repo.SaveAll())
            {
                return CreatedAtRoute("GetPhoto", new { id = photo.Id }, _mapper.Map<PhotoForReturnDto>(photo));
            }
            return BadRequest("Nie udało się dodać zdjęcia!");
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int id)
        {
            var photo = await _repo.GetPhoto(id);
            if (photo == null)
            {
                return NotFound($"Zdjęcie numerze id: {id}, które próbowałeś usunąć, już nie istnieje");
            }
            var deleteParams = new DeletionParams(photo.PublicId);
            var result = _cloudinary.Destroy(deleteParams);
            if (result.Result == "ok")
            {
                _repo.RemovePhoto(photo);
            }
            if (await _repo.SaveAll())
            {
                return NoContent();
            }
            return BadRequest("Nie udało się usunąć zdjęcia!");
        }
    }
}