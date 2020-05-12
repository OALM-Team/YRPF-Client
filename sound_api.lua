AmbiantSounds = {}

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

