AmbiantSounds = {}
SoundsInstance = {}

AddEvent("OnObjectStreamIn", function(object)
    CheckAmbiantSound(object)
end)

AddEvent("OnObjectStreamOut", function(object)
    if AmbiantSounds[object] ~= nil then
        DestroySound(AmbiantSounds[object])
        AmbiantSounds[object] = nil
    end
end)

function CheckAmbiantSound(object)
    if GetObjectPropertyValue(object, "ambiantSoundObject") ~= nil then
        
        local ObjectActor = GetObjectActor(object)
		ObjectActor:SetActorScale3D(FVector(0.0, 0.0, 0.0))
		ObjectActor:SetActorHiddenInGame(true)
        ObjectActor:SetActorEnableCollision(false)

        local soundId = GetObjectPropertyValue(object, "ambiantSoundName")
        local x,y,z = GetObjectLocation(object)
        AmbiantSounds[object] = CreateSound3D(soundId, x,y,z, GetObjectPropertyValue(object, "ambiantSoundRadius"))
        SetSoundVolume(AmbiantSounds[object], GetObjectPropertyValue(object, "ambiantSoundVolume"))
    end
end

function Play2DSound(path, volume) 
    SetSoundVolume(CreateSound(path), volume)
end
AddEvent("Play2DSound", Play2DSound)
AddRemoteEvent("Sound:Play2DSound", Play2DSound)

function PlayAndRegister2DSound(id, path, volume) 
    local s = CreateSound(path)
    SoundsInstance[id] = s
    SetSoundVolume(s, volume)
end
AddEvent("PlayAndRegister2DSound", PlayAndRegister2DSound)
AddRemoteEvent("Sound:PlayAndRegister2DSound", PlayAndRegister2DSound)


function Stop2DSound(id) 
    local s = SoundsInstance[id]
    if s ~= nil then
        DestroySound(s)
    end
end
AddEvent("Stop2DSound", Stop2DSound)
AddRemoteEvent("Sound:Stop2DSound", Stop2DSound)

