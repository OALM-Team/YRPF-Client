function OnPackageStart()
    CreateTimer(function()
        for _,object in pairs(GetStreamedObjects(false)) do
            if GetObjectPropertyValue(object, "harvestable") == 1 then
                ShowHarvestObject(object)
            end

            if GetObjectPropertyValue(object, "canBeWear") == 1 then
                ShowWearableObject(object)
            end
        end
    end, 1000) 
end
AddEvent("OnPackageStart", OnPackageStart)

function ShowHarvestObject(object)
    local x,y,z = GetPlayerLocation(GetPlayerId())
    local x2,y2,z2 = GetObjectLocation(object)
    
    if GetDistance3D(x, y, z, x2, y2, z2) <= GetObjectPropertyValue(object, "harvestableInteractDistance") then
        SetObjectOutline(object, true)
    else
        SetObjectOutline(object, false)
    end
end

function ShowWearableObject(object) 
    local x,y,z = GetPlayerLocation(GetPlayerId())
    local x2,y2,z2 = GetObjectLocation(object)
    
    if GetDistance3D(x, y, z, x2, y2, z2) <= 150 then
        SetObjectOutline(object, true)
    else
        SetObjectOutline(object, false)
    end
end

function GetNearbyWearableObject()
    local x,y,z = GetPlayerLocation(GetPlayerId())
    n = nil
    nD = 9999999
    for _,o in pairs(GetStreamedObjects()) do
        if GetObjectPropertyValue(o, "canBeWear") == 1 then
            local x2, y2, z2 = GetObjectLocation(o)
            if GetDistance3D(x,y,z,x2,y2,z2) <= 150 then
                if n == nil then
                    n = o
                    nD = GetDistance3D(x,y,z,x2,y2,z2)
                elseif(nD > GetDistance3D(x,y,z,x2,y2,z2)) then
                    n = o
                    nD = GetDistance3D(x,y,z,x2,y2,z2)
                end
            end
        end
    end
    return n
end

AddEvent("OnKeyPress", function(key)
    -- Lock toogle vehicle
    if(key == "E" and GetNearbyWearableObject() ~= nil) then
        CallRemoteEvent("Job:WearObject", GetObjectPropertyValue(GetNearbyWearableObject(), "uuid"))
    elseif key == "E" and GetNearbyWearableObject() == nil then
        CallRemoteEvent("Object:Interact")
    end
end)