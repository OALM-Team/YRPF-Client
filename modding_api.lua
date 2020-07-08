local paks = {}
paks["YRPF"] = LoadPak("YRPF", "/YRPF/", "../../../OnsetModding/Plugins/YRPF/Content")
paks["Gang01"] = LoadPak("Gang01", "/Gang01/", "../../../OnsetModding/Plugins/Gang01/Content/")
paks["Gang02"] = LoadPak("Gang02", "/Gang02/", "../../../OnsetModding/Plugins/Gang02/Content/")

AddEvent("OnObjectStreamIn", function(object)
    if GetObjectPropertyValue(object, "customModelPath") ~= nil then
        UpdateCustomModel(object, GetObjectPropertyValue(object, "customModelPath"))
    end
    if GetObjectPropertyValue(object, "enablePhysic") ~= nil then
        EnablePhysic(object, GetObjectPropertyValue(object, "enablePhysic"))
    end
end)

AddRemoteEvent("Modding:AddCustomObject", function(id, path)
	ReplaceObjectModelMesh(id, path)
end)

AddEvent("OnObjectNetworkUpdatePropertyValue", function(object, PropertyName, PropertyValue)
    if PropertyName == "customModelPath" then
        UpdateCustomModel(object, PropertyValue)
    end

    if PropertyName == "enablePhysic" then
        EnablePhysic(object, PropertyValue)
    end
end)

AddEvent("OnPickupStreamIn", function(pickup)
    if GetPickupPropertyValue(pickup, "customModelPath") ~= nil then
        UpdateCustomPickupModel(pickup, GetPickupPropertyValue(pickup, "customModelPath"))
    end
end)

AddEvent("OnPickupNetworkUpdatePropertyValue", function(pickupId, PropertyName, PropertyValue)
    if PropertyName == "customModelPath" then
        UpdateCustomPickupModel(pickupId, PropertyValue)
    end
end)

function EnablePhysic(object, state)
    local SMC = GetObjectStaticMeshComponent(object)
    local actor = GetObjectActor(object)
    
    if state == 1 then
        SMC:SetMobility(EComponentMobility.Movable)
        SMC:SetCollisionEnabled(ECollisionEnabled.QueryAndPhysics)
        SMC:SetSimulatePhysics(true)
        SMC:SetEnableGravity(true)
        SMC:SetPhysicsLinearVelocity(FVector(0,0,-100), false, "None")
    else
        SMC:IsSimulatingPhysics(false)
        SMC:SetEnableGravity(false)
    end
end

function UpdateCustomModel(object, modelPath)
    local SMC = GetObjectStaticMeshComponent(object)
    local mobility = SMC:GetMobility()
    SMC:SetMobility(EComponentMobility.Movable)
    SMC:SetStaticMesh(UStaticMesh.LoadFromAsset(modelPath))
    SMC:SetMobility(mobility)
end

function UpdateCustomPickupModel(object, modelPath)
    local SMC = GetPickupStaticMeshComponent(object)
    local mobility = SMC:GetMobility()
    SMC:SetMobility(EComponentMobility.Movable)
    SMC:SetStaticMesh(UStaticMesh.LoadFromAsset(modelPath))
    SMC:SetMobility(mobility)
end