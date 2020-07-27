ActiveParticles = {}

AddEvent("OnObjectStreamIn", function(object)
    if GetObjectPropertyValue(object, "isParticle") ~= nil then
        
        local x,y,z = GetObjectLocation(object)
        local rx,ry,rz = GetObjectRotation(object)
        local ObjectActor = GetObjectActor(object)

		ObjectActor:SetActorScale3D(FVector(0.0, 0.0, 0.0))
		ObjectActor:SetActorHiddenInGame(true)
        ObjectActor:SetActorEnableCollision(false)
        
        local emitter = GetWorld():SpawnEmitterAtLocation(UParticleSystem.LoadFromAsset(GetObjectPropertyValue(object, "particleAsset")), FVector(x, y, z),
            FRotator(rx, ry, rz), FVector(GetObjectPropertyValue(object, "sx"), GetObjectPropertyValue(object, "sy"), GetObjectPropertyValue(object, "sz")))
        ActiveParticles[object] = emitter
    end
end)


AddEvent("OnObjectStreamOut", function(object)
    if ActiveParticles[object] ~= nil then
        local emitter = ActiveParticles[object]
        emitter:Destroy()
        ActiveParticles[object] = nil
    end
end)